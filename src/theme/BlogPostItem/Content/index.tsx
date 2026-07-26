import React, {type ReactNode} from 'react';
import Content from '@theme-original/BlogPostItem/Content';
import type ContentType from '@theme/BlogPostItem/Content';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import type {WrapperProps} from '@docusaurus/types';
import ContentLock from '@site/src/components/ContentLock';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): ReactNode {
    const {metadata, isBlogPostPage} = useBlogPost();
    const fm = metadata?.frontMatter as { lock?: boolean; lock_preview?: number };
    // 只在文章详情页锁定；列表页的摘要正常显示
    const locked = isBlogPostPage && fm?.lock === true;

    return (
        <Content {...props}>
            {locked ? (
                <ContentLock previewHeight={fm?.lock_preview}>
                    {props.children}
                </ContentLock>
            ) : (
                props.children
            )}
        </Content>
    );
}
