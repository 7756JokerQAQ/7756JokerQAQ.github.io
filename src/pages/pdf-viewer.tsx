import React from "react";
import Layout from "@theme/Layout";
import {useLocation} from "@docusaurus/router";
import PdfViewer from "../components/PdfViewer";

export default function PdfViewerPage(): React.JSX.Element {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const file = params.get("file");
    const title = params.get("title") ?? undefined;

    return (
        <Layout title={title ?? "PDF 阅读"} description="在线阅读 PDF">
            <div
                style={{
                    maxWidth: 1400,
                    margin: "0 auto",
                    padding: "0.5rem 0.75rem",
                    height: "calc(100vh - var(--ifm-navbar-height, 60px))",
                    boxSizing: "border-box",
                }}
            >
                {file ? (
                    <PdfViewer
                        key={file}
                        file={file}
                        title={title}
                        height="100%"
                    />
                ) : (
                    <div style={{padding: "2rem", textAlign: "center"}}>
                        缺少 <code>?file=</code> 参数。用法示例：
                        <br />
                        <code>/pdf-viewer?file=/pdfs/your.pdf</code>
                    </div>
                )}
            </div>
        </Layout>
    );
}
