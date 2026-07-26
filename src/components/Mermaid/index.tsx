import {useEffect, useState} from "react";
import type {ReactNode, CSSProperties} from "react";
import Mermaid from "@theme/Mermaid";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

export default function MermaidChart(props: { mermaidData: string }): ReactNode {
    const [fullscreen, setFullscreen] = useState(false);

    // ESC 关闭全屏 + 锁定背景滚动
    useEffect(() => {
        if (!fullscreen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setFullscreen(false);
        };
        document.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [fullscreen]);

    return (
        <>
            {/* 普通态：纯静态展示，无缩放/平移；右上角「全屏」按钮 */}
            <div style={wrapperStyle}>
                <button
                    style={fsBtnStyle}
                    onClick={() => setFullscreen(true)}
                    title="全屏查看"
                    aria-label="全屏查看"
                >
                    ⛶ 全屏
                </button>
                <div style={innerStyle}>
                    <Mermaid value={props.mermaidData}/>
                </div>
            </div>

            {/* 全屏态：遮罩层 + 缩放/平移交互 */}
            {fullscreen && (
                <div style={overlayStyle} onClick={() => setFullscreen(false)}>
                    <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.5}
                            maxScale={8}
                            limitToBounds={false}
                            wheel={{step: 0.15}}
                            doubleClick={{mode: "toggle", step: 0.7}}
                            panning={{velocityDisabled: true}}
                        >
                            {({zoomIn, zoomOut, resetTransform}) => (
                                <>
                                    <div style={toolbarStyle}>
                                        <button style={btnStyle} onClick={() => zoomIn()} title="放大" aria-label="放大">+</button>
                                        <button style={btnStyle} onClick={() => zoomOut()} title="缩小" aria-label="缩小">−</button>
                                        <button style={btnStyle} onClick={() => resetTransform()} title="重置" aria-label="重置">↺</button>
                                        <button
                                            style={{...btnStyle, marginLeft: "auto", width: "auto", padding: "0 0.6rem"}}
                                            onClick={() => setFullscreen(false)}
                                            title="退出全屏 (Esc)"
                                            aria-label="退出全屏"
                                        >
                                            ✕ 退出
                                        </button>
                                    </div>
                                    <TransformComponent
                                        wrapperStyle={{width: "100%", maxHeight: "82vh"}}
                                        contentStyle={{margin: "0 auto"}}
                                    >
                                        <Mermaid value={props.mermaidData}/>
                                    </TransformComponent>
                                </>
                            )}
                        </TransformWrapper>
                    </div>
                </div>
            )}
        </>
    );
}

const wrapperStyle: CSSProperties = {
    position: "relative",
    border: "1px solid var(--ifm-color-emphasis-200)",
    borderRadius: "8px",
    padding: "0.5rem",
    margin: "1rem 0",
    overflow: "hidden",
};

const fsBtnStyle: CSSProperties = {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    zIndex: 2,
    cursor: "pointer",
    fontSize: "0.8rem",
    padding: "0.2rem 0.5rem",
    border: "1px solid var(--ifm-color-emphasis-300)",
    borderRadius: "4px",
    background: "var(--ifm-background-color)",
    color: "var(--ifm-font-color-base)",
};

const innerStyle: CSSProperties = {
    textAlign: "center",
};

const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.85)",
    padding: "1rem",
};

const modalStyle: CSSProperties = {
    position: "relative",
    maxWidth: "95vw",
    maxHeight: "95vh",
    width: "100%",
    background: "#ffffff", // 强制不透明浅色底，匹配 Mermaid 写死的浅色调，保证线条/文字清晰
    color: "#1f2328",
    borderRadius: "8px",
    padding: "0.75rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
};

const toolbarStyle: CSSProperties = {
    display: "flex",
    gap: "0.25rem",
    marginBottom: "0.5rem",
};

const btnStyle: CSSProperties = {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    lineHeight: 1,
    cursor: "pointer",
    border: "1px solid #d0d7de",
    borderRadius: "4px",
    background: "#ffffff",
    color: "#1f2328",
};
