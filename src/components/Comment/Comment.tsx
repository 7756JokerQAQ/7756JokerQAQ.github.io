import React, {JSX} from 'react'
import {useColorMode} from '@docusaurus/theme-common'
import Giscus, {GiscusProps} from '@giscus/react'
import {useLocation} from '@docusaurus/router';

const defaultConfig: Partial<GiscusProps> = {
    id: 'comments',
    mapping: 'specific',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'top',
    loading: 'lazy',
    strict: '1', // 用根据路径标题自动生成的 sha1 值，精确匹配 github discussion，避免路径重叠（比如父和子路径）时评论加载串了
    lang: 'zh-CN',
}

/**
 * Giscus 评论组件（文档页底部使用）。
 *
 * TODO[评论]: 当前已禁用，避免使用原作者的评论配置。
 * 启用步骤：
 *   1. 打开 https://giscus.app ，填入你的仓库生成配置；
 *   2. 把下方 giscusConfig 的 repo / repoId / categoryId 填上即可。
 */
export default function Comment(): JSX.Element {
    // Hooks 必须无条件调用，放在所有 early-return 之前
    const {colorMode} = useColorMode()
    const path = useLocation().pathname.replace(/^\/|\/$/g, '')

    // TODO[评论]: 填入你自己的 Giscus 配置后即可启用
    const giscusConfig = {
        repo: '',            // e.g. 'your-name/your-repo'
        repoId: '',          // 由 giscus.app 生成
        category: 'General',
        categoryId: '',      // 由 giscus.app 生成
    }

    // 未配置前不渲染评论
    if (!giscusConfig.repo || !giscusConfig.repoId || !giscusConfig.categoryId) {
        return null
    }

    const giscus = {...defaultConfig, ...giscusConfig}

    let subPath: string
    const firstSlashIndex = path.indexOf('/')
    subPath = firstSlashIndex !== -1 ? path.substring(firstSlashIndex + 1) : 'index'

    giscus.term = subPath
    giscus.theme = colorMode === 'dark' ? 'transparent_dark' : 'light'

    // @ts-ignore
    return <Giscus {...giscus} />
}
