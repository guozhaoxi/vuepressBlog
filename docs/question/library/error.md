# zrender

**1. 我们许久之前在页面中使用了zrender这个库,现在运行起来，报了一堆错误，怎么办？ （2021-11-19）**

答： 首先遇到这种情况应该先看报了什么错，然后去package.json中查找我们当初使用的zrender版本是多少，如果看不到，那当我们运行的时候就是默认安装最新的版本，这就可能是导致我们运行不起来的原因之一；
接着我们打开zrender的官方文档，看看它的语法和我们项目中的是否一致，这个时候也要小心多想一下，官方文档是不是最新的？（我今天就是遇到了这个坑，作者把源码更新了，却没有更新文档）。
如果还是没有解决我们的问题，那么我们就去官方的github地址，去issue中搜索我们的问题，是否有人和我们遇到了一样的错误呢？（我今天就是通过在issue中查找，解决了我的问题）。


**2. 开发环境下运行正常，当我们打包部署上线的时候报错了Error: Renderer 'undefined' is not imported. Please import it first. （2021-11-19）**

答：首先导致这个问题的原因暂且不知道，但是当我们遇到这个问题的时候，在项目中加入以下两行代码即可解决

```js
import CanvasPainter from "zrender/lib/canvas/Painter"
zrender.registerPainter("canvas",CanvasPainter)
```
需要 registerPainter 才可以正常用

**3. 三代机和四代机装车动画页面直视图绘制水泥包丢失的问题 （2021-11-20）**

```js
layerZhi(val) {
      let height =
        Math.round((this.trueWuMessage.height / this.multiple) * 100) / 100;
      let width = val.packageType
        ? this.trueWuMessage.length / this.multiple
        : this.trueWuMessage.width / this.multiple;
      this.zhiGroup.name = "zhi";
      let canvasHeight = document.getElementById("canvas1").clientHeight;
      let { coordinateY, bottomHeight } = this.car;
      let houVal = height * val.layer;
      let x = val.y / this.multiple + this.weiX - coordinateY - width / 2;
      let y = canvasHeight - bottomHeight - houVal;
      let bao1 = new zrender.Rect({
        name: val.layer + "-" + val.row,
        shape: {
          x: x,
          y: y,
          width: width - 0.6,
          height: height - 0.6
        },
        style: {
          fill: this.color(val.layer),
          stroke: "#ffffff",
          lineWidth: 0.5
        }
      });
      // let tarList = this.zhiGroup
      //   .children()
      //   .filter(data => data.name === val.layer + "-" + val.row);
      // if (tarList.length === 0) {
      //   this.zhiGroup.add(bao1);
      // }
      this.zhiGroup.add(bao1);
    }
```

遇到这种问题的时候我们首先应该如何快速定位问题呢，那就是先去找绘制直视图的函数，这就要说到函数命名的问题了，一个合理的函数名可以帮助我们提高解决问题的效率，我们通过看代码知道，是前同事做了一次过滤（被我们注释掉的这段代码），导致在绘制的时候出现了这个问题。三代机和四代机都有这种问题，所以我们需要将两个分支的代码都进行修改。

**4. 三代机和四代机仿真页面装车动画俯视图第一包水泥包丢失的问题**

据现在的同事说，这个问题已经好久了，后来公司没了前端开发人员就一直这么用着，然后让我看看能不能把这个问题解决一下。首先找到仿真页面的vue文件，通过一步一步调试，我找到了问题所在。这里以装20包为例，在开始装车的时候，每装一包水泥，后端通过websocket传给我们一包的坐标信息；到装车结束的时候，总共给了我们20包的水泥包的数据，但是我们可以看到第一包水泥包并没有被前端绘制出来，由此可以推断问题是出在了前端的。

通过阅读代码我大概理清了前端代码的一个思路，页面初始化的时候，拿订单信息/拿物料信息/拿车辆信息/绘制直视图/绘制俯视图等等操作，通过watch观察obj这个对象(后端给我们的水泥包坐标信息，是一个对象)，每当这个值有变化的时候，就调用绘制直视图/绘制俯视图的方法去绘制。通过调试，我看到了，当后端给了我们第一包水泥数据的时候，我们拿到的对象是undefined，只有第二包的时候才正常；所以这个问题就出在了第一包上。在我调试了3个小时后，还是解决不了，于是我想，既然后端给我们的数据是完整的，那么我们就在mounted的时候来手动执行一次绘制吧，于是问题得到解决。

```js
if (that.$store.state.list) {
        that.$store.state.list.forEach(val => {
          that.layerFu(val);
          that.layerZhi(val, true, "#FFF600");
          that.jiHead(val);
        });
      }
```

至此，这个问题得到了解决，这次解决问题的经历是目前我入职以来最消耗时间的一次。不得不感慨，一个公司尤其是以技术为主的公司，有没有文档/文档的质量高低还是很重要的。试想一下，一位新人接手了原来的工作，遇到问题不知从哪儿下手的时候，前同事留下来的文档显得多么的宝贵。这就更加让我觉得，我目前在写的这个文档是有用的，不管以后谁接手我的工作，最起码有据可循。
