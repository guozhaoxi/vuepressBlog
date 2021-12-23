# React 组件

## 什么是react组件

```javascript
class textClass {
    sayHello = () => console.log('hello, my name is guozhaoxi.)
}

class Index extends React.Component{
    state = { message: 'hello world!' }
    sayHello = () => this.setState({message: 'hello, my name is guozhaoxi'})
    render () {
        return <div style={{marginTop: '50px'}} onClick={this.sayHello}>{this.state.message}</div>
    }
}

function textFun() {
    return 'hello world'
}

function FunComponent() {
    const { message, setMessage } = useState("hello, world")
    return <div onClick={() => setMessage("hello, my name is guozhaoxi")}>{ message }</div>
}

```
组件本质上就是类和函数，但是与常规的类和函数不同的是，**组件承载了渲染视图的UI和更新视图的setState,useState方法。** React在底层逻辑上会像正常实例化类和正常执行函数那样处理组件。

因此，函数与类的特性在React组件上同样具有，比如原型链，继承，静态属性等，所以不要把React组件和类与函数独立开来。

### 函数组件和类组件的本质区别是什么呢？
**对于类组件来说，底层只需要实例化一次，实例中保存了组件的state状态。对于每一次更新只需要调用render方法以及对应的生命周期就可以了。但是在函数组件中，每一次更新都是一次新的函数的执行，一次函数组件的更新，里面的变量会重新声明。**

为了能让函数组件保存一些状态，执行一些副作用钩子，React Hooks应运而生，它可以帮助记录React中组件的状态，处理一些额外的副作用。

## 组件通信方式

React一共有5种主流的通信方式：
1. props 和 callback方式
2. ref方式
3. React-redux 或 React-mobx 状态管理方式
4. context上下文
5. event bus 事件总线

## 组件的强化方式

1. 类组件继承
```javascript
class Person extends React.Component {
    constructor(props) {
        super(props)
        console.log('hello, i am person')
    }
    componentDidMount() {console.log("1111")}
    eat() {
        console.log("吃饭")
    }
    sleep() {
        console.log("睡觉")
    }
    render() {
        return <div>
            大家好，我是一个person
        </div>
    }
}

class Programmer extends Person {
    constructor(props) {
        super(props)
        console.log("hello, i am programmer too")
    }
    componentDidMount() {console.log(this)}
    code() {
        console.log("写代码")
    }
    render() {
        return <div style={{ marginTop: '50px' }}>
            { super.render() }
            我还是一个程序员
        </div>
    }
}

export default Programmer
```

我们不难发现这个继承增强效果很优秀，它的优势如下：
1. 可以控制父类render，还可以添加一些其他的渲染内容；
2. 可以共享父类方法，还可以添加额外的方法和属性。

但是也有其他值得注意的地方，就是state和生命周期会被继承后的组件修改，像上面案例中，Person组件的componentDidMount生命周期将不会被执行。

2. 函数组件自定义Hook

3. HOC高阶组件

## 总结

- 知道了React组件本质就是UI+update+常规的类和函数，以及React对组件的底层处理逻辑
- 明白了函数组件和类组件的区别
- 掌握组件通信方式
- 掌握了组件强化方式