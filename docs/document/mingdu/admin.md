# 杭州明度智慧管控端
## 介绍
bpl-admin-frontend 是杭州明度智慧公司管控端前端项目。此项目为杭州明度智慧司机端的后天管理系统，大致分为**车道监控**，**历史记录**, **车道管理**, **参数管理**,和**系统管理**几个模块。
它是基于[vue](https://cn.vuejs.org/)这个前端框架来实现的，用的是iview-admin这个开源的后台框架。为企业和客户方更好的管理司机端提供了极大的便利。

## 起步 
安装依赖：
```js
npm install
```
启动项目：
```js
npm run dev
``` 
打包项目：
```js
npm run build
```

## 目录结构
```markdown
├── package.json                # 项目依赖文件
├── public
│   ├── config.js               # 全局配置，可修改，不会被打包
│   ├── favicon.ico             # 网站图标
│   └── index.html              # 根页面
├── src
│   ├── App.vue                 # 根组件
│   ├── assets                  # 静态资源
│   ├── components              # 自定义组件
│   ├── config                  # 配置
│   ├── connect                 # 封装的ajax
│   ├── directive               # 自定义指令
│   ├── libs                    # 工具函数
│   ├── locale                  # 语言包
│   ├── main.js                 # 入口文件
│   ├── mixins                  # 混入函数
│   ├── router                  # 路由目录
│   ├── store                   # 全局状态
│   ├── util                    # 工具函数
│   └── view                    # 页面目录
└── vue.config.js               # webpack配置文件

```

## 功能
```markdown
  - 登录 / 退出
  
  - 权限验证
    - 页面权限
    - 指令权限
    - 权限配置

  - 全局功能
    - 国际化多语言
    - 动态侧边栏（支持多级路由嵌套）
    - 动态面包屑
    - 快捷导航
    - 本地/后端 mock数据
    - 自适应收缩侧边栏

  - 组件
    - CountTo
    - cropper
    - icons
    - main
    - markdown
    - table-expand
    - loading-animation
    - info-card

  - Echarts图表
```

## 新增页面
我们的后台管理系统新增页面实际上是要由后端来配置的，每当用户登录以后，他能够访问哪些页面实际上是通过接口来拿到的。当我们拿到这些数据以后，前端会做过滤和转换成vue-router所需要的数据格式。具体代码实现在`router/apps/route-business.js` 

## 结束语
这个项目实际上是在开源框架iview-admin的基础上做来一个二次开发，并且删除了大量的页面和逻辑，我们的模块目前还很少，基本上就是table和form表单的增删改查，对于刚刚接手项目的你来说，只需要花时间看一下文件目录和巧妙的利用全局搜索功能，基本上就可以很快的上手了，比如对现有页面进行修改和新增功能页面。 
加油！

本文完