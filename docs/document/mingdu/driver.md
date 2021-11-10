# 杭州明度智慧司机端

## 介绍
杭州明度智慧司机端，是杭州明度至盛公司研发的自动装车设备的前端方案。它基于前端框架[vue](https://cn.vuejs.org/)来实现，面向的用户人群主要以货车司机为主，为用户方提供了便利的装车方案，我们来简单介绍一下项目，方便以后的人来接手项目。 

## 文件目录说明
项目的资源文件/入口文件/组件代码/路由/全局状态管理等都存放在src目录下，我们简单的介绍一下每个文件夹存放的内容是什么（对于有经验的同事来说，看到文件夹名称就能知道）

#### assets
这里存放的是我们要用到的一些静态资源文件，比如图片和css文件，打包的时候也会被压缩打包。

#### components
这里存放的是我们自己封装的的自定义组件。

#### connect
这个目录下面存放的是我们之前的同事自己封装的ajax请求方法，websocket客户端，以及websocket的事件列表以及要跳转的路由列表。

#### pages
所有的页面文件都存放于这个目录下面。

#### router
这里存放的是路由配置文件。

#### store
这里存放的是全局状态。

#### util
这里面封装的都是一些工具方法。

#### App.vue
根组件。

#### main.js
入口文件，在这里，我们可以引入一些第三方库和全局的一些配置 比如路由 全局状态管理等。

## 配置
配置的路径为public/config.js，之所以放在public目录下是因为vue项目在打包的时候不会将public目录下的文件进行压缩打包，我们有不同的用户方，他们的一些配置也是不同的，所以将此文件放置在public目录下。 
我们简单说一下这几个配置项。 

#### vue.config.js
vue-cli相关的配置文件，这里呢可以配置我们打包时候的一些行为，具体参考[vue-cli](https://cli.vuejs.org/zh/guide/)

#### topic
websocket对应的url地址

#### backendURL
接口地址，这里注意要区分开发环境/生产环境

#### Authorization
发送请求时添加到请求头当中的一个标识符，默认为'driver'

#### Keyboard
刷卡订单功能需要，默认为分号。当我们刷卡以后，会拿到一个字符串，这个字符串是以分号开始的，我们在后续的业务当中会判断是否具有这个符号，从而进行下一步的逻辑。

#### SwipingCardURL
刷卡接口地址

#### conversionOfNumber
是否需要进制转换，刷卡功能需要，默认为true

#### isDetectionOrderError
是否需要检测订单异常信息，默认为true。如果开启状态，那么当后端检测到刷卡订单异常的话，会主动给前端推送一个消息，前端进行展示。

#### 页面支持右键菜单
我们这个项目要求最终上线的时候是不允许用户自己右键查看的，但是开发的时候又免不了要用右键菜单，所以我们在public/index.html的body标签上 配置一下oncontextmenu,当它为true的时候支持，false的时候不支持。

## 部分功能说明
其实这个项目不算复杂，只是刚接手的同事可能会像丈二和尚摸不着头脑，这里简单的写几个我认为是难点的地方，便于后来的同事接手项目可以快速上手和定位问题。

#### 刷卡
因为当我们刷了卡以后，会给我们带来一个以分号开头的字符串，并且会按下回车键。那么我们要做的就是拿到这个订单号，利用http协议发送给后端。话不多说，我们来看一下代码是怎么实现的。 

```js
document.onkeydown = (e) => {
      let key = e.key
      if (key === 'Enter') {
        let index = this.keyCode.indexOf(window.Keyboard)
        if (index > -1) {
          let str = this.keyCode.substring(index + 1, this.keyCode.length)
          if (window.conversionOfNumber) {
            str = this.stringToHex(str)
          }
          if (str === 'gitversion') {
            this.isGit = true
          } else {
            // 刷卡订单逻辑
            if (
              localStorage.getItem('laneId') === '1' &&
              this.$route.path === '/home/hello'
            ) {
              new Request({ baseUrl: window.SwipingCardURL })
                .get('/api/v1/loading?cardNO=' + str)
                .then((res) => {
                  if (res.code === 100) {
                    this.isCardError = false
                  } else {
                    this.isCardError = true
                    this.isCardErrorMsg = res.msg
                  }
                })
            }
          }
        }
        this.keyCode = ''
      } else if (key === window.Keyboard) {
        this.keyCode = window.Keyboard
      } else if (key.length === 1 && key !== window.Keyboard) {
        this.keyCode += key
      }
    }
```
上面这段代码的逻辑也十分简单，我们监听了回车事件，然后拿到这个以分号为开头的订单号，用js的原生api进行截取，去掉分号，就是我们要传递给后端的单号，只要拿到单号，发送给后端，我们的任务就完成了。在这里要注意，我们做了一个判断来决定是否需要对单号进行进制转换。 

#### 路由的跳转
说到路由的跳转，只要是用过vue的人都知道是用vue-router来实现的。我们这个项目也不例外，只是调用vue-router的地方和我们以往的项目不同，因为我们这个项目用了websocket，用来和后端进行实时通讯。后端和上位机进行通讯以后拿到状态，然后再通过websocket来和前端通讯，前端拿到对应的事件类型以后做判断，我们随便
拿一个例子来说一下。  
我们项目中监听websocket事件的方法定义在pages/home.vue中，有一个叫dealResult的方法。
```js
dealResult(res) {
    switch(res.command) {
        case 'NOTIFY_COMMAND_CANCEL_ORDER':
            this.$http
                .delete(
                   `/api/v3/taskexecutor/terminate/${localStorage.getItem('laneId')}`
                 )
                 .then((res) => {
                    if (res.code === 0) {
                      this.$router.push('/')
                    }
                 })
    }
}
```
我这里只贴了一部分的代码，但是也足以表达意思。后端推送给我们的消息对象就是我们这个函数的参数res,我们来判断它的command，从而作出对应的操作。上面这是一个取消订单的事件，那么我们就需要把对应的参数通过http协议传递给后盾啊，从而跳转到首页。 

#### 装车动画
要说这个项目中最复杂的地方，应该就属于我们的装车动画了。我们装车页面是pages/loading/process.vue,那么我们的装车动画呢，实际上是封装了一个自定义组件，它的目录是在pages/carAnimation/index.vue。 
我们简单说一下它的实现逻辑，首先，我们的装车动画分为直视图和俯视图，所以我们要有两个画布，这里使用的是HTML5所带来的新特性canvas。关于canvas的语法其实并不难，多看一下就能掌握了。  

我们通过后端接口获取到车辆的基本信息，然后按照一定的比例进行缩放到我们的页面上来，车的简易图使用的也是canvas来进行绘制的，这些绘制基本属性的方法被封装在来一个单独的类中。当我们的简易图绘制好了以后，现在的页面是静态的，但是装车是实时的，所以要让我们的简易图动起来，那么如何做这个事呢？  
答案显而易见，我们要借助于websocket，通过它拿到后端发给我们的每一包水泥的坐标，每装一包水泥，就返回给我们一个坐标，然后我们拿到这个坐标以后，去绘制。这里还需要注意的一个问题就是，当我们刷新页面以后，还要重新获取一下已经装包的数量，把它们也绘制出来。 
canvas提供了橡皮擦，可以让我们擦掉一个区域，这样机头看上去就只有一个一直在随坐标的改变而变化，给人一种动画的感觉。 
由于代码量大，就不贴具体的实现方法，大家可以自行打开源码去里面看。 

#### 手动订单确认之前加一个密码输入
添加日期：2021.11.10 

用到的组件：iview中的Modal/Message 

逻辑：获取垛型参数列表，拿到我们想要的配置，然后根据这个值来判断是否需要密码验证，如果为true我们就会要求用户输入密码，和我们设置的密码一致的情况下，就允许确认，如果不需要验证，直接可以确认。 

```js
async getStackingParams() {
      const result = await this.$http.get(
        `/api/v3/stacking/query/${localStorage.getItem('stackingId')}`
      )
      if (result.code === 0) {
        const parasList = result.result.paras
        // 过滤找出我们的那一项配置
        const option = parasList.find(
          (item) => item.name === 'WHETHER_TO_CHECK'
        )
        this.isOpenValidate = option.value === '1' ? true : false
      }
    }
  handleRender() {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.password,
              autofocus: true,
              placeholder: '请输入密码',
            },
            on: {
              input: (val) => {
                this.password = val
              },
              'on-blur': () => {
                if (this.password) {
                  if (this.password === 'mdzh8888') {
                    this.sendOrder()
                  } else {
                    this.$Message.error('密码输入错误')
                  }
                }
              },
            },
          })
        },
      })
    }

   affirm() {
      if (this.isOpenValidate) {
        this.handleRender()
      } else {
        this.sendOrder()
      }
    }

    sendOrder() {
      this.password = ''
      let obj = Object.assign({}, this.formItem)
      let number = '手动' + new Date().getTime() + 'driver'
      obj.name = number
      obj.orderNo = number
      if (Object.values(obj).indexOf('') > -1) {
        this.isError = true
      } else {
        this.$http.post(
          `/api/v3/taskexecutor/order/${localStorage.getItem('laneId')}`,
          obj
        )
      }
    }
```
 
## 结束语
关于杭州明度智慧司机端项目的文档暂时就先写到这里，其实项目页面没几个，只是刚接手的人面对一些目录结构可能会有点不知道如何下手，希望自己输出的这篇文档能够帮助到后来的人快速的接手项目。写的很笼统，后面有时间的话再进行详细的补充 
 
本文完。
