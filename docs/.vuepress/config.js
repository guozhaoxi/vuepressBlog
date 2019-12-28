module.exports = {
  title: '叩首问路，码梦为生',
  description: '你好，我叫郭二蛋',
  base: '/', // 基准url
  href: './favicon.ico',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#53A8FF' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#53A8FF' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '技术', link: '/blog/' },
    ],
    lastUpdated: '上次更新',
    sidebar: {
      '/blog/': getBlog('前言'),
      '/': [
        'contact', /* /contact.html */
        'about',    /* /about.html */
      ]
    },
    sidebarDepth: 2,
    repo: '123',
    repoLabel: 'Github',
    docsRepo: '',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '编辑此页'
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }]
  ]
}

function getBlog (title) {
  return [
    {
      title: title,
      collapsable: false,
      children: [
        'start'
      ]
    },
    {
      title: 'JavaScript设计模式',
      collapsable: false,
      children: [
        'watcher'
      ]
    }
  ]
}