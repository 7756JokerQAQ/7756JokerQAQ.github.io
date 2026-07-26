import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import {
    generateTOTP,
    currentCounter,
    secondsIntoStep,
    UNLOCK_SECRET,
} from '@site/src/lib/totp';
import styles from './unlock.module.css';

const STEP = 30;

export default function UnlockPage(): React.ReactNode {
    const [code, setCode] = useState('------');
    const [remaining, setRemaining] = useState(STEP);

    useEffect(() => {
        let active = true;
        const tick = async () => {
            const now = Date.now();
            const next = await generateTOTP(UNLOCK_SECRET, currentCounter(now));
            if (active) {
                setCode(next);
                setRemaining(STEP - secondsIntoStep(now));
            }
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => {
            active = false;
            clearInterval(id);
        };
    }, []);

    return (
        <Layout title="获取动态验证码">
            <main className="container container--narrow margin-vert--xl text--center">
                <h1>动态验证码</h1>
                <p className={styles.lead}>
                    关注公众号并回复关键词后即可看到此页面。验证码每 {STEP} 秒更新一次，
                    请在更新前输入到文章解锁框。
                </p>
                <div className={styles.codeBox}>{code}</div>
                <p>
                    本次验证码剩余 <strong>{remaining}</strong> 秒
                </p>
                <p className={styles.hint}>
                    将上方 6 位数字输入文章解锁框即可阅读全文。
                </p>
            </main>
        </Layout>
    );
}
