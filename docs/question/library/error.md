# zrender

**1. 我们许久之前在页面中使用了zrender这个库,现在运行起来，报了一堆错误，怎么办？**

答： 首先遇到这种情况应该先看报了什么错，然后去package.json中查找我们当初使用的zrender版本是多少，如果看不到，那当我们运行的时候就是默认安装最新的版本，这就可能是导致我们运行不起来的原因之一；
接着我们打开zrender的官方文档，看看它的语法和我们项目中的是否一致，这个时候也要小心多想一下，官方文档是不是最新的？（我今天就是遇到了这个坑，作者把源码更新了，却没有更新文档）。
如果还是没有解决我们的问题，那么我们就去官方的github地址，去issue中搜索我们的问题，是否有人和我们遇到了一样的错误呢？（我今天就是通过在issue中查找，解决了我的问题）。


**2. 开发环境下运行正常，当我们打包部署上线的时候报错了Error: Renderer 'undefined' is not imported. Please import it first.**

答：首先导致这个问题的原因暂且不知道，但是当我们遇到这个问题的时候，在项目中加入以下两行代码即可解决

```js
import CanvasPainter from "zrender/lib/canvas/Painter"
zrender.registerPainter("canvas",CanvasPainter)
```
需要 registerPainter 才可以正常用