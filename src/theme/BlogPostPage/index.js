import React, {useEffect, useRef} from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {
    BlogPostProvider,
    useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import BlogLayout from '@theme/BlogLayout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import TOC from '@theme/TOC';
import ContentVisibility from '@theme/ContentVisibility';

function BlogPostPageContent({sidebar, children}) {
    const {metadata, toc} = useBlogPost();
    const {nextItem, prevItem, frontMatter} = metadata;
    const {
        hide_table_of_contents: hideTableOfContents,
        toc_min_heading_level: tocMinHeadingLevel,
        toc_max_heading_level: tocMaxHeadingLevel,
    } = frontMatter;

    const commentElement = useRef(null);

    useEffect(() => {
        // TODO[评论]: 在 https://giscus.app 生成你的配置后填入下方三项即可启用博客评论
        const giscusConfig = {
            repo: '',       // e.g. 'your-name/your-repo'
            repoId: '',     // 由 giscus.app 生成
            categoryId: '', // 由 giscus.app 生成
        };
        // 未配置前不注入，避免使用原作者的评论配置
        if (!giscusConfig.repo || !giscusConfig.repoId || !giscusConfig.categoryId) return;

        let s = document.createElement("script");
        s.src = "https://giscus.app/client.js";
        s.setAttribute("data-repo", giscusConfig.repo);
        s.setAttribute("data-repo-id", giscusConfig.repoId);
        s.setAttribute("data-category", "General");
        s.setAttribute("data-category-id", giscusConfig.categoryId);
        s.setAttribute("data-mapping", "pathname");
        s.setAttribute("data-reactions-enabled", "1");
        s.setAttribute("data-emit-metadata", "0");
        s.setAttribute("data-input-position", "bottom");
        s.setAttribute("data-theme", "light");
        s.setAttribute("data-lang", "zh-CN");
        s.setAttribute("crossorigin", "anonymous");
        s.async = true;
        commentElement.current.appendChild(s);
    }, []);

    return (
        <BlogLayout
            sidebar={sidebar}
            toc={
                !hideTableOfContents && toc.length > 0 ? (
                    <TOC
                        toc={toc}
                        minHeadingLevel={tocMinHeadingLevel}
                        maxHeadingLevel={tocMaxHeadingLevel}
                    />
                ) : undefined
            }>
            <ContentVisibility metadata={metadata}/>

            <BlogPostItem>{children}</BlogPostItem>

            {(nextItem || prevItem) && (
                <BlogPostPaginator nextItem={nextItem} prevItem={prevItem}/>
            )}

            <div style={{marginTop: '20px'}} ref={commentElement}></div>

        </BlogLayout>
    );
}

export default function BlogPostPage(props) {
    const BlogPostContent = props.content;
    return (
        <BlogPostProvider content={props.content} isBlogPostPage>
            <HtmlClassNameProvider
                className={clsx(
                    ThemeClassNames.wrapper.blogPages,
                    ThemeClassNames.page.blogPostPage,
                )}>
                <BlogPostPageMetadata/>
                <BlogPostPageStructuredData/>
                <BlogPostPageContent sidebar={props.sidebar}>
                    <BlogPostContent/>
                </BlogPostPageContent>
            </HtmlClassNameProvider>
        </BlogPostProvider>
    );
}
