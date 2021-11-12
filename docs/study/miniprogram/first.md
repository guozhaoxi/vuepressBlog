# 微信小程序基础用法

## wxs的应用

#### 处理文本转换

```js
var convert = function (status) {
  var statusText;

  switch (status) {
    case 0:
      statusText = '待审核'
      break;
    case 1:
      statusText = '待发布'
      break;
    case 2:
      statusText = '已发布'
      break;
      case 3:
      statusText = '已下架'
      break;
      case 4:
      statusText = '已取消'
      break;
      case 5:
      statusText = '审核不通过'
      break;
    default:
      statusText = '未知状态'
  }
  return statusText
}

module.exports = {
  convert: convert
}
```

```wxml
<wxs src="/common/wxs/status-text.wxs" module="statusText"></wxs>
<view>{{statusText.convert(service.status)}}</view>
```

#### wxs实现手指滑动监听切换标签
```js
var touchStartX
function handleTouchstart(event) {
    touchStartX = event.changedTouches[0].clientX
}

function handleTouchend(event, ownerInstance) {
    var touchEndX = event.changedTouches[0].clientX
    // 负数代表手指向左滑动了 正数代表向右滑动了
    var distance = touchEndX - touchStartX
    // -1 后退 0 不动  1 前进
    var direction = 0
    // 向左滑动 前进
    if (distance < 0 && distance <-70) {
        direction = 1
    }
    // 向右滑动 后退
    if (distance > 0 && distance > 70) {
        direction = -1
    }

    if (direction !== 0) {
        // 1.触发事件
        ownerInstance.callMethod('handleTouchMove', {direction: direction})
    }
}

module.exports = {
    handleTouchstart: handleTouchstart,
    handleTouchend: handleTouchend
}
```

```wxml
<wxs src="../../common/wxs/touchMove.wxs" module="touch"></wxs>
 <view class="tab-panel" 
    bind:touchstart="{{touch.handleTouchstart}}" 
    bind:touchend="{{touch.handleTouchend}}">
   <slot name="panel"></slot>
 </view>
```

## behavior
```js
const behavior = Behavior({
    properties: {
        service: Object
    }
})

export default behavior


import behavior from "../behavior/behavior";
Component({
behaviors: [behavior]
})
```

关于微信小程序的behavior，我觉得就和vue框架的mixin混入是一样的，他可以抽离一些不同组件共有的逻辑，然后引入到组件中使用。