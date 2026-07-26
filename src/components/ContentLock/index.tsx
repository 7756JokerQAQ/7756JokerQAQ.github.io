import React, {useEffect, useState} from 'react';
import {verifyTOTP} from '@site/src/lib/totp';
import styles from './styles.module.css';

const SESSION_KEY = 'content-lock-unlocked';

/** 默认可见预览高度（px）：标题 + 开头若干内容。 */
const DEFAULT_PREVIEW_HEIGHT = 380;

interface ContentLockProps {
    children: React.ReactNode;
    /** 可见预览高度（px），可在 frontmatter 用 lock_preview 覆盖。 */
    previewHeight?: number;
}

/**
 * 君子锁：内容照常渲染，但容器限高 + 底部渐变淡出 + 解锁卡片，
 * 使标题和开头部分可见，下方截断锁定。
 * 输入正确的 6 位动态验证码（前端 TOTP，装饰性）→ 解锁，状态存 sessionStorage（仅当次会话）。
 * 注意：客户端锁可被 F12 / 禁用 JS / 查看源码绕过，仅挡普通读者。
 */
export default function ContentLock({
    children,
    previewHeight = DEFAULT_PREVIEW_HEIGHT,
}: ContentLockProps): React.ReactNode {
    const [unlocked, setUnlocked] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [checking, setChecking] = useState(false);

    // 解锁状态读取放到 effect 里，避免 SSR/CSR hydration 不一致
    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY) === '1') {
            setUnlocked(true);
        }
    }, []);

    if (unlocked) {
        return <>{children}</>;
    }

    const handleUnlock = async () => {
        setChecking(true);
        setError(false);
        const ok = await verifyTOTP(input);
        setChecking(false);
        if (ok) {
            sessionStorage.setItem(SESSION_KEY, '1');
            setUnlocked(true);
        } else {
            setError(true);
        }
    };

    return (
        <div className={styles.lockWrapper}>
            {/* 内容照常渲染，但限高截断：标题 + 开头可见 */}
            <div
                className={styles.previewBox}
                style={{maxHeight: previewHeight}}
                aria-hidden="true">
                {children}
            </div>

            {/* 实心锁定面板：不透明，完全遮住下方截断内容，内含解锁卡片 */}
            <div className={styles.lockPanel}>
                <div className={styles.card}>
                    <div className={styles.lockIcon}>🔒</div>
                    <h3 className={styles.title}>剩余内容已锁定</h3>
                    <p className={styles.desc}>
                        关注微信公众号，回复关键词获取<strong>调用链接</strong>，
                        打开后查看 6 位动态验证码。
                    </p>
                    <img
                        className={styles.qr}
                        src="/img/wechat-qr.png"
                        alt="微信公众号二维码"
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                    />
                    <div className={styles.inputRow}>
                        <input
                            className={styles.input}
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="输入 6 位动态验证码"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setError(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUnlock();
                                }
                            }}
                        />
                        <button
                            type="button"
                            className={styles.btn}
                            onClick={handleUnlock}
                            disabled={checking}>
                            {checking ? '校验中…' : '解锁'}
                        </button>
                    </div>
                    {error && (
                        <p className={styles.error}>验证码不正确或已过期，请重试</p>
                    )}
                </div>
            </div>
        </div>
    );
}
