import React, {type ReactNode} from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import type {WrapperProps} from '@docusaurus/types';
import ContentLock from '@site/src/components/ContentLock';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): ReactNode {
    const {frontMatter} = useDoc();
    const fm = frontMatter as { lock?: boolean; lock_preview?: number };
    const locked = fm.lock === true;

    return (
        <Content {...props}>
            {locked ? (
                <ContentLock previewHeight={fm.lock_preview}>
                    {props.children}
                </ContentLock>
            ) : (
                props.children
            )}
        </Content>
    );
}
