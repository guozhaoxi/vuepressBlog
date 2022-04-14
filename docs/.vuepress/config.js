module.exports = {
  title: '叩首问路，码梦为生',
  description: '你好，我叫郭二蛋，欢迎你来到这里',
  base: '/', // 基准url
  href: './favicon.ico',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
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
      { text: 'Vue', link: '/vue/standard' },
      { text: 'React', link: '/react/first' },
      { text: 'Typescript', link: '/typescript/first' },
      { text: '微信小程序', link: '/miniprogram/first' },
      { text: '设计模式', link: '/design/watcher'},
      { text: '数据结构与算法', link: '/structure/queue'},
      { text: '服务器部署踩坑', link: '/service/pit' }
    ],
    lastUpdated: '上次更新',
    sidebar: {
      '/vue': getVueRoutes(),
      '/react': getReactRoutes(),
      '/typescript': getTypescriptRoutes(),
      '/miniprogram': getMpRoutes(),
      '/design': getDesignRoutes(),
      '/structure': getStructureRoutes(),
      '/service': getServiceRoutes()
    },
    sidebarDepth: 2,
    repo: 'guozhaoxi/vuepressBlog',
    repoLabel: 'Github',
    docsRepo: 'guozhaoxi',
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


function getServiceRoutes() {
  return [
    {
      title: '服务器部署踩坑',
      collapsable: false,
      children: [
        'service/pit',
      ]
    }
  ]
}

function getStructureRoutes() {
  return [
    {
      title: '数据结构',
      collapsable: false,
      children: [
        'structure/stack',
        'structure/queue',
        'structure/erfen',
      ]
    }
  ]
}

function getDesignRoutes() {
  return [
    {
      title: '设计模式',
      collapsable: false,
      children: [
        'design/watcher',
        'design/adapter'
      ]
    }
  ]
}

function getMpRoutes() {
  return [
    {
      title: '微信小程序',
      collapsable: false,
      children: [
        'miniprogram/first',
      ]
    }
  ]
}

function getTypescriptRoutes() {
  return [
    {
      title: 'Typescript',
      collapsable: false,
      children: [
        'typescript/first',
      ]
    }
  ]
}

function getVueRoutes() {
  return [
    {
      title: 'Vue3实现后台前端综合解决方案',
      collapsable: false,
      children: [
        'vue/standard',
        'vue/login',
        'vue/layout',
        'vue/general',
        'vue/center',
        'vue/userRole',
        'vue/roleControl',
        'vue/dynamicTable',
        'vue/markdown',
        'vue/deploy',
        'vue/conclusion'
      ]
    }
  ]
}

function getReactRoutes() {
  return [
    {
      title: 'React',
      collapsable: false,
      children: [
        'react/first',
        'react/component',
        'react/state',
        'react/props',
        'react/lifeCycle'
      ]
    },
  ]
}

function getQuestionRoutes () {
  return [
    {
      title: '第三方库',
      collapsable: false,
      children: [
        'library/error',
      ]
    },
    {
      title: '开发者工具',
      collapsable: false,
      children: [
        'idea/error',
      ]
    }
  ]
}

function getStudyRoutes () {
  return [
    {
      title: 'React',
      collapsable: false,
      children: [
        'react/first',
        'react/component',
        'react/state',
        'react/props',
        'react/lifeCycle'
      ]
    },
    {
      title: 'Vue',
      collapsable: false,
      children: [
        'vue/first',
        'vue/standard',
        'vue/login',
        'vue/layout'
      ]
    },

    {
      title: '设计模式',
      collapsable: false,
      children: [
        'design-mode/adapter',
        'design-mode/watcher',
      ]
    },
    {
      title: '微信小程序',
      collapsable: false,
      children: [
        'miniprogram/first',
      ]
    },
  ]
}

function getDocumentRoutes () {
  return [
    {
      title: '杭州明度',
      collapsable: false,
      children: [
        'mingdu/driver',
        'mingdu/admin',
      ]
    }
  ]
}
