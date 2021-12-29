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
      { text: '学习', link: '/study/index' },
      { text: '问题', link: '/question/index' },
      { text: '文档', link: '/document/index' },
      { text: '读书', link: '/read/index' },
    ],
    lastUpdated: '上次更新',
    sidebar: {
      '/question/': getQuestionRoutes(),
      '/study/': getStudyRoutes(),
      '/document/': getDocumentRoutes(),
      '/read/': getReadRoutes(),
      '/travel/': getTravelRoutes(),
      '/idea/': getIdeaRoutes(),
      '/cll/': getCllRoutes()
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
      title: 'Html5',
      collapsable: false,
      children: [
        'html/first',
      ]
    },
    {
      title: 'CSS',
      collapsable: false,
      children: [
        'css/first',
      ]
    },
    {
      title: 'JavaScript',
      collapsable: false,
      children: [
        'js/first',
      ]
    },
    {
      title: 'Node',
      collapsable: false,
      children: [
        'node/first',
      ]
    },
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
      ]
    },
    {
      title: 'Webpack',
      collapsable: false,
      children: [
        'webpack/first',
      ]
    },
    {
      title: 'TypeScript',
      collapsable: false,
      children: [
        'typescript/first',
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

function getReadRoutes () {
  return [
    {
      title: '思考，快与慢',
      collapsable: false,
      children: [
        'fastandslow/first',
      ]
    }
  ]
}


function getTravelRoutes () {
  return [
    {
      title: '云南丽江古城',
      collapsable: false,
      children: [
        'lijiang/first',
      ]
    },
    {
      title: '张北草原天路',
      collapsable: false,
      children: [
        'zhangbei/first',
      ]
    }
  ]
}


function getIdeaRoutes () {
  return [
    {
      title: '关于求职跳槽',
      collapsable: false,
      children: [
        'job/first',
      ]
    },
    {
      title: '关于人生的思考',
      collapsable: false,
      children: [
        'family/first',
      ]
    }
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




function getCllRoutes () {
  return [
    {
      title: '遇见',
      collapsable: false,
      children: [
        'yujian/first'
      ]
    },
    {
      title: '点滴',
      collapsable: false,
      children: [
          'diary/diary'
      ]
    }
  ]
}