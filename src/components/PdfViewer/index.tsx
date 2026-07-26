import {useCallback, useEffect, useRef, useState} from "react";
import type {CSSProperties, ReactNode} from "react";
import type * as PDFJS from "pdfjs-dist";

type PdfDoc = PDFJS.PDFDocumentProxy;

interface PdfViewerProps {
    /** PDF 文件 URL，建议放在 /pdfs/ 下，如 /pdfs/xxx.pdf */
    file: string;
    /** 容器高度，默认 80vh */
    height?: string | number;
    title?: string;
}

/* ------------------------------ 图标 ------------------------------ */
type IconProps = {size?: number};

const ChevronLeft = ({size = 18}: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
);
const ChevronRight = ({size = 18}: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
);
const Expand = ({size = 18}: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
);
const Collapse = ({size = 18}: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>
);
const Download = ({size = 18}: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/></svg>
);

/* ------------------------------ 组件 ------------------------------ */
export default function PdfViewer(props: PdfViewerProps): ReactNode {
    const {file, height = "80vh", title} = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const leftCanvasRef = useRef<HTMLCanvasElement>(null);
    const rightCanvasRef = useRef<HTMLCanvasElement>(null);
    const pdfRef = useRef<PdfDoc | null>(null);
    const tasksRef = useRef<PDFJS.RenderTask[]>([]);

    const [numPages, setNumPages] = useState(0);
    const [pageNum, setPageNum] = useState(1); // 左页页码
    const [zoom, setZoom] = useState(1); // 用户额外缩放倍数
    const [fitScale, setFitScale] = useState(0); // 适配高度的基础缩放
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFs, setIsFs] = useState(false);

    // 1. 加载 PDF（客户端动态导入，避免 SSR）
    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        (async () => {
            try {
                const pdfjsLib = await import("pdfjs-dist");
                pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                    "pdfjs-dist/build/pdf.worker.min.mjs",
                    import.meta.url,
                ).toString();
                const ver = pdfjsLib.version;
                const pdf = await pdfjsLib.getDocument({
                    url: file,
                    cMapUrl: `https://unpkg.com/pdfjs-dist@${ver}/cmaps/`,
                    cMapPacked: true,
                    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${ver}/standard_fonts/`,
                }).promise;
                if (cancelled) {
                    pdf.destroy();
                    return;
                }
                pdfRef.current = pdf;
                setNumPages(pdf.numPages);
                setPageNum(1);
                setZoom(1);
                setLoading(false);
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e.message : String(e));
                    setLoading(false);
                }
            }
        })();
        return () => {
            cancelled = true;
            tasksRef.current.forEach((t) => t.cancel());
            tasksRef.current = [];
        };
    }, [file]);

    // 2. 渲染单页到指定 canvas
    const renderPage = useCallback(async (pdf: PdfDoc, num: number, canvas: HTMLCanvasElement, scale: number) => {
        const page = await pdf.getPage(num);
        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({scale});
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const task = page.render({
            canvasContext: ctx,
            viewport,
            transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
        });
        tasksRef.current.push(task);
        try {
            await task.promise;
        } catch {
            // 翻页/缩放主动取消会抛 RenderingCancelledException，忽略
        }
    }, []);

    // 3. 按高度适配（永远双页，放不下时横向滚动）
    const recalc = useCallback(async () => {
        const pdf = pdfRef.current;
        const stage = stageRef.current;
        if (!pdf || !stage) return;
        try {
            const page = await pdf.getPage(pageNum);
            const v = page.getViewport({scale: 1});
            const availH = stage.clientHeight - 16;
            if (availH <= 0 || v.height <= 0) return;
            setFitScale(Math.max(0.1, availH / v.height));
        } catch {
            /* ignore */
        }
    }, [pageNum]);

    useEffect(() => {
        if (pdfRef.current) recalc();
    }, [recalc, numPages, isFs]);

    useEffect(() => {
        const onResize = () => recalc();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [recalc]);

    // 4. 渲染当前对开（左 / 右，永远双页）
    useEffect(() => {
        const pdf = pdfRef.current;
        const left = leftCanvasRef.current;
        if (!pdf || !left || loading || fitScale <= 0) return;
        tasksRef.current.forEach((t) => t.cancel());
        tasksRef.current = [];
        const scale = fitScale * zoom;
        const hasRight = pageNum + 1 <= numPages;
        (async () => {
            await renderPage(pdf, pageNum, left, scale);
            const right = rightCanvasRef.current;
            if (right) {
                if (hasRight) {
                    right.style.display = "block";
                    await renderPage(pdf, pageNum + 1, right, scale);
                } else {
                    right.style.display = "none";
                }
            }
        })();
    }, [pageNum, zoom, fitScale, loading, numPages, renderPage]);

    // 5. 全屏
    useEffect(() => {
        const onFsChange = () => setIsFs(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", onFsChange);
        return () => document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    const toggleFullscreen = () => {
        const el = containerRef.current;
        if (!el) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else el.requestFullscreen?.();
    };

    // 6. 键盘左右翻页（对开模式恒为步进 2）
    const step = 2;
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (loading || error) return;
            const tag = (e.target as HTMLElement)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            if (e.key === "ArrowRight") setPageNum((p) => Math.min(numPages, p + step));
            else if (e.key === "ArrowLeft") setPageNum((p) => Math.max(1, p - step));
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [loading, error, numPages, step]);

    const zoomIn = () => setZoom((z) => Math.min(4, +(z + 0.2).toFixed(2)));
    const zoomOut = () => setZoom((z) => Math.max(0.4, +(z - 0.2).toFixed(2)));
    const zoomReset = () => setZoom(1);

    const progress = numPages > 0 ? (pageNum / numPages) * 100 : 0;
    const hasRight = pageNum + 1 <= numPages;

    return (
        <div ref={containerRef} className="pdf-viewer" style={{...wrapperStyle, height}}>
            {/* 顶部阅读进度（signature） */}
            <div className="pdfr-progress" style={progressTrackStyle}>
                <span style={{...progressFillStyle, width: `${progress}%`}} />
            </div>

            {/* 工具栏 */}
            <div style={toolbarStyle}>
                <div style={groupStyle}>
                    <button className="pdfr-btn" style={iconBtnStyle} onClick={() => setPageNum((p) => Math.max(1, p - step))} disabled={pageNum <= 1} title="上一页（←）" aria-label="上一页"><ChevronLeft /></button>
                    <div style={pageInfoStyle}>
                        <input
                            className="pdfr-input"
                            style={pageInputStyle}
                            type="number"
                            min={1}
                            max={numPages || 1}
                            value={pageNum}
                            aria-label="当前页码"
                            onChange={(e) => {
                                const v = parseInt(e.target.value, 10);
                                if (!Number.isNaN(v)) setPageNum(Math.min(numPages, Math.max(1, v)));
                            }}
                        />
                        <span style={slashStyle}>/</span>
                        <span style={totalStyle}>{numPages || "…"}</span>
                    </div>
                    <button className="pdfr-btn" style={iconBtnStyle} onClick={() => setPageNum((p) => Math.min(numPages, p + step))} disabled={pageNum >= numPages} title="下一页（→）" aria-label="下一页"><ChevronRight /></button>
                </div>

                <div style={groupStyle}>
                    <button className="pdfr-btn" style={iconBtnStyle} onClick={zoomOut} title="缩小" aria-label="缩小">−</button>
                    <button className="pdfr-btn" style={percentBtnStyle} onClick={zoomReset} title="重置缩放" aria-label="重置缩放">{Math.round(zoom * 100)}%</button>
                    <button className="pdfr-btn" style={iconBtnStyle} onClick={zoomIn} title="放大" aria-label="放大">+</button>

                    <span style={dividerStyle} />

                    <a className="pdfr-btn" style={{...iconBtnStyle, textDecoration: "none", color: "inherit"}} href={file} download title="下载 PDF" aria-label="下载 PDF"><Download /></a>
                    <button className="pdfr-btn" style={iconBtnStyle} onClick={toggleFullscreen} title={isFs ? "退出全屏" : "全屏"} aria-label="全屏">{isFs ? <Collapse /> : <Expand />}</button>
                </div>
            </div>

            {/* 阅读区：对开两页，按高度撑满 */}
            <div ref={stageRef} style={stageStyle}>
                {title && !loading && !error && <div style={titleStyle}>{title}</div>}
                {loading && (
                    <div style={statusStyle}>
                        <svg className="pdfr-spinner" width="28" height="28" viewBox="0 0 24 24" fill="none" style={{color: "#12affa"}}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="44 100"/></svg>
                        <span style={{marginTop: "0.75rem"}}>正在准备文档</span>
                    </div>
                )}
                {error && (
                    <div style={errorStyle}>
                        <div style={{fontSize: "1rem", marginBottom: "0.35rem"}}>无法打开这份文档</div>
                        <div style={{opacity: 0.7, fontSize: "0.8rem"}}>{error}</div>
                    </div>
                )}
                <div style={spreadStyle}>
                    <canvas ref={leftCanvasRef} style={{...pageCanvasStyle, display: loading || error ? "none" : "block"}} />
                    <canvas ref={rightCanvasRef} style={{...pageCanvasStyle, display: hasRight ? "block" : "none"}} />
                </div>
            </div>
        </div>
    );
}

/* ------------------------------ 样式 ------------------------------ */
const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#33373d",
    margin: "1rem 0",
    color: "#e7e9ec",
};

const progressTrackStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "rgba(255,255,255,0.06)",
    zIndex: 3,
};

const progressFillStyle: CSSProperties = {
    display: "block",
    height: "100%",
    background: "#12affa",
};

const toolbarStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    padding: "0.5rem 0.75rem",
    background: "#272b30",
    borderBottom: "1px solid rgba(0,0,0,0.3)",
    flexShrink: 0,
};

const groupStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
};

const iconBtnStyle: CSSProperties = {
    width: "34px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    borderRadius: "7px",
    background: "transparent",
    color: "#e7e9ec",
    fontSize: "1.1rem",
};

const percentBtnStyle: CSSProperties = {
    height: "34px",
    minWidth: "54px",
    padding: "0 0.6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    borderRadius: "7px",
    background: "rgba(255,255,255,0.06)",
    color: "#e7e9ec",
    fontSize: "0.82rem",
    fontVariantNumeric: "tabular-nums",
};

const dividerStyle: CSSProperties = {
    width: "1px",
    height: "20px",
    background: "rgba(255,255,255,0.12)",
    margin: "0 0.15rem",
};

const pageInfoStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0 0.35rem",
    fontVariantNumeric: "tabular-nums",
    fontSize: "0.85rem",
};

const pageInputStyle: CSSProperties = {
    width: "2.4rem",
    textAlign: "center",
    background: "transparent",
    border: "none",
    color: "#e7e9ec",
    fontSize: "0.85rem",
    padding: "2px 0",
};

const slashStyle: CSSProperties = {color: "#5f656d"};
const totalStyle: CSSProperties = {color: "#8a9099"};

const stageStyle: CSSProperties = {
    flex: 1,
    minHeight: 0, // 关键：允许收缩，避免 canvas 撑大父容器（修复翻页变宽 bug）
    minWidth: 0,
    overflow: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#33373d",
    padding: "0.5rem",
};

const spreadStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
};

const pageCanvasStyle: CSSProperties = {
    display: "block",
    boxShadow: "0 12px 40px -12px rgba(0,0,0,0.6)",
    borderRadius: "2px",
};

const titleStyle: CSSProperties = {
    position: "absolute",
    top: "0.5rem",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#7e848c",
    fontSize: "0.75rem",
    letterSpacing: "0.02em",
    pointerEvents: "none",
};

const statusStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#9aa0a6",
    fontSize: "0.85rem",
    padding: "3rem 2rem",
};

const errorStyle: CSSProperties = {
    textAlign: "center",
    color: "#e7e9ec",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    padding: "1.5rem 2rem",
    margin: "2rem",
};
