/**
 * 前端 TOTP（RFC 6238）—— 君子锁装饰用。
 *
 * 注意：密钥是【公开】的（打包进静态站点），任何人 F12 都能看到，
 * 因此这里的"动态验证码"只起装饰/挡小白的作用，不是真正的安全边界。
 * 真正的"防读取"需要内容本身不下发到客户端（见真保护方案）。
 *
 * 同一套密钥 + 算法同时用于：
 *   - /unlock 页面：展示当前码
 *   - ContentLock 组件：校验用户输入
 *   - 你后端/公众号：如需对齐，用相同密钥生成（Base32 标准即可）
 */

const STEP_SECONDS = 30;
const DIGITS = 6;

/** 公开密钥（仅 Base32 字符集 A–Z / 2–7）。改它需同步 /unlock 与公众号回复来源。 */
export const UNLOCK_SECRET = 'JOKERBLOGUNLOCK';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32Decode(secret: string): Uint8Array {
    const cleaned = secret.replace(/=+$/, '').replace(/\s/g, '').toUpperCase();
    let bits = 0;
    let value = 0;
    const output: number[] = [];
    for (const ch of cleaned) {
        const idx = BASE32_ALPHABET.indexOf(ch);
        if (idx === -1) {
            throw new Error(`invalid base32 char: ${ch}`);
        }
        value = value * 32 + idx;
        bits += 5;
        if (bits >= 8) {
            output.push((value >>> (bits - 8)) & 0xff);
            bits -= 8;
        }
    }
    return new Uint8Array(output);
}

async function hmacSha1(key: Uint8Array, message: Uint8Array): Promise<ArrayBuffer> {
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        key,
        {name: 'HMAC', hash: 'SHA-1'},
        false,
        ['sign'],
    );
    return crypto.subtle.sign('HMAC', cryptoKey, message);
}

/** 把计数器转成 8 字节大端序列（HMAC 的消息体）。 */
function counterToBytes(counter: number): Uint8Array {
    const bytes = new Uint8Array(8);
    let v = Math.floor(counter);
    for (let i = 7; i >= 0; i--) {
        bytes[i] = v & 0xff;
        v = Math.floor(v / 256);
    }
    return bytes;
}

/** 生成某一时间计数器对应的 6 位 TOTP 码。 */
export async function generateTOTP(
    secret: string,
    timeCounter: number,
): Promise<string> {
    const key = base32Decode(secret);
    const message = counterToBytes(timeCounter);
    const hash = new Uint8Array(await hmacSha1(key, message));
    const offset = hash[hash.length - 1] & 0x0f;
    const binary =
        ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff);
    const otp = binary % 10 ** DIGITS;
    return otp.toString().padStart(DIGITS, '0');
}

/** 当前 30s 时间计数器。 */
export function currentCounter(timeMs: number = Date.now()): number {
    return Math.floor(timeMs / 1000 / STEP_SECONDS);
}

/** 当前 30s 步内已过去的秒数（用于倒计时显示）。 */
export function secondsIntoStep(timeMs: number = Date.now()): number {
    return Math.floor(timeMs / 1000) % STEP_SECONDS;
}

/**
 * 校验用户输入的码是否匹配（±1 个时间窗，共 90s 容错时钟偏移）。
 * 使用恒定时间比较以防时序侧信道（装饰场景下其实无所谓，顺手做对）。
 */
export async function verifyTOTP(
    input: string,
    secret: string = UNLOCK_SECRET,
    timeMs: number = Date.now(),
): Promise<boolean> {
    const trimmed = input.trim();
    if (!/^\d{6}$/.test(trimmed)) {
        return false;
    }
    const counter = currentCounter(timeMs);
    for (const delta of [0, -1, 1]) {
        const expected = await generateTOTP(secret, counter + delta);
        if (timingSafeEqual(trimmed, expected)) {
            return true;
        }
    }
    return false;
}

function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) {
        return false;
    }
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
}
