# 理解lifeCycle

## 类组件生命周期介绍

**铺垫：** React的两个重要阶段，分别是render阶段和commit阶段，React在调和(render)阶段会深度遍历React fiber树，目的就是发现不同(diff), 不同的地方就是接下来需要更新的地方，对于变化的组件，就会执行render函数。在一次调和过程完毕之后，就到了commit阶段，commit阶段会创建修改真实的DOM节点。

如果在一次调和的过程中，发现了一个 `fiber tag = 1 ` 的情况，就会按照类组件的逻辑来处理。对于类组件的处理逻辑，首先判断类组件是否已经创建过。

## React类组件生命周期执行过程探秘
React的大部分生命周期的执行，都在`mountClassInstance `和 `updateClassInstance` 这两个方法中执行。方便理解，将这两个方法简化成mount(初始化渲染) 和 update(更新)两个方向。

这里为了学习方便理解，将生命周期的执行流程分为**组件初始化**，**组件更新**, **组件销毁**三大阶段。

### 初始化阶段
constructor执行

在mount阶段，首先执行的是constructorClassInstance函数，用来实例化组件。

在实例化组件之后，会调用mountClassInstance进行组件初始化。

那么我们来看一下 mountClassInstance 做了一些什么工作？

①**getDerivedStateFromProps执行**

在初始化阶段，`getDerivedStateFromProps`是第二个执行的生命周期，值得注意的是它是从ctor类上直接绑定的静态方法，传入props,state。返回值和之前的state合并，作为新的state，传递给组件实例使用。

②**componentWillMount执行**

如果存在`getDerivedStateFromProps` 和 `getSnapshotBeforeUpdate` 就不会执行 `componentWillMount`。

③**render执行**

到此为止`mountClassInstance`函数完成，但是上面 `updateClassComponent`函数，在执行完mountClassInstance后，执行了render渲染函数，形成了children,接下来React调用reconcileChildren方法深度调用children。

④**componentDidMount执行**

在前面，我们说过，有render和commit两个阶段。前面介绍的几个生命周期函数都是在render阶段执行的，一旦React调和完所有的fiber节点，就会到commit阶段，在组件初始化commit阶段，会调用`componentDidMount`生命周期。

`componentDidMount`执行时机 和 `componentDidUpdate` 执行时机是相同的，只不过一个是针对初始化，一个是针对组件更新。到初始化阶段，生命周期执行完毕。

执行顺序：constructor -> getDerivedStateFromProps / componentWillMount -> render -> componentDidMount

说完了初始化阶段，我们再来分析一下组件更新中，会有哪些生命周期执行呢？

### 更新阶段

在`updateClassComponent`函数中，当发现current不为null的情况时，说明类组件被挂载过，那么直接按照更新逻辑处理。

①执行生命周期 **componentWillReceiveProps**

首先判断 `getDerivedStateFromProps` 生命周期是否存在，如果不存在就执行 `componentWillReceiveProps` 生命周期。传入该生命周期两个参数，分别是NewProps和nextContext。

② 执行生命周期 **getDerivedStateFromProps**

接下来执行生命周期 `getDerivedStateFromProps`, 返回的值用于合并state,生成新的state。

③执行生命周期 **shouldComponentUpdate**

接下来执行生命周期 `shouldComponentUpdate`, 传入新的props, 新的state, 和新的context, 返回值决定是否继续执行render函数，和调和子节点。上面提到的 `getDerivedStateFromProps`的返回值作为新的state,传递给 `shouldComponentUpdate`。

④执行生命周期 **componentWillUpdate**

接下来执行生命周期 componentWillUpdate。 updateClassInstance方法到此执行完毕了。

⑤执行**render**

接下来执行render函数，得到最新的 React element元素。然后继续调和子节点。

⑥执行 **getSnapshotBeforeUpdate**

`getSnapshotBeforeUpdate`的执行也是在commit阶段，commit阶段细分为 `before Mutation`(DOM修改前)，`Mutation`(DOM修改)， `Layout`(DOM修改后)三个阶段，getSnapshotBeforeUpdate发生在 `before Mutation`阶段，生命周期的返回值，将作为第三个参数__reactInternalSnapshotBeforeUpdate传递给componentDidUpdate。

⑦执行 **componentDidUpdate**

接下来执行生命周期 componentDidUpdate, 此时 DOM已经修改完成。可以操作修改之后的DOM。到此为止更新阶段的生命周期执行完毕。

更新阶段对应的生命周期的执行顺序：

componentWillReceiveProps（props改变）/ getDerivedStateFromProps -> shouldComponentUpdate -> componentWillUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate

### 销毁阶段

①执行生命周期 **componentWillUnmount**

销毁阶段就比较简单了，在一次调和更新中，如果发现元素被移除，就会打对应的 Deletion标签，然后在commit阶段就会调用 `componentWillUnmount` 生命周期，接下来统一卸载组件以及DOM元素。

### React各阶段生命周期能做些什么

#### 1 constructor

React在不同的时期抛出不同的生命周期钩子，也就意味着这些生命周期钩子不同的使命。constructor在类组件创建实例时调用，而且在初始化的时候执行一次，所以constructor可以做一些初始化的工作。

```javascript
constructor(props) {
    super(props)         // 执行super 传递props，才能在接下来的上下文中获取props
    this.state = {       // 初始化state
        name: "guoerdan"
    }
    this.handleClick = this.handleClick.bind(this)   // 绑定this
    this.handleInputChange = debounce(this.handleInputChange, 500)  // 绑定防抖函数
    const _render = this.render
    this.render = function() {
        return _render.bind(this)    // 劫持修改类组件上的一些生命周期
    }
}
// 点击事件
handleClick() {}
// 表单输入
handleInputChange() {}
```

constructor作用：

- 初始化state,可以用来截取路由参数，赋值给state。
- 对类组件的事件做一些处理，比如绑定this, 防抖，节流等。
- 对类组件进行一些必要生命周期的劫持，渲染劫持。