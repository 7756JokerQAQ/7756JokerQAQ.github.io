import React, {JSX} from 'react'
import {useColorMode} from '@docusaurus/theme-common'
import Giscus, {GiscusProps} from '@giscus/react'

const defaultConfig: Partial<GiscusProps> = {
    id: 'comments',
    mapping: 'pathname',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'bottom',
    loading: 'lazy',
    lang: 'zh-CN',
}

export default function Comment(): JSX.Element {
    const {colorMode} = useColorMode()
    const giscusConfig: Partial<GiscusProps> = {
        repo: '7756JokerQAQ/7756JokerQAQ.github.io',
        repoId: 'R_kgDOTj7qNA',
        category: 'General',
        categoryId: 'DIC_kwDOTj7qNM4DCAV6',
    }
    const giscus = {
        ...defaultConfig,
        ...giscusConfig,
        // 跟随站点明暗切换评论主题（比 preferred_color_scheme 更贴合 Docusaurus）
        theme: colorMode === 'dark' ? 'transparent_dark' : 'light',
    }
    // @ts-ignore
    return <Giscus {...giscus} />
}
