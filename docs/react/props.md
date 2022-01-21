# props

## 理解props

### 1 props是什么？

对于react应用中写的子组件， 无论是函数组件还是类组件，父组件绑定在它们标签里的属性/方法，最终会变成props传递给它们。但这也不是绝对的，比如说ref或者key, react在底层做一些额外的处理。看一下在react中props可以是一些什么东西？

```javascript
/* children 组件 */
function ChidrenComponent(){
    return <div> In this chapter, let's learn about react props ! </div>
}

/* props 接受处理 */
class PropsComponent extends React.Component{
    componentDidMount(){
        console.log(this,'_this')
    }
    render(){
        const {  children , mes , renderName , say ,Component } = this.props
        const renderFunction = children[0]
        const renderComponent = children[1]
        /* 对于子组件，不同的props是怎么被处理 */
        return <div>
            { renderFunction() }
            { mes }
            { renderName() }
            { renderComponent }
            <Component />
            <button onClick={ () => say() } > change content </button>
        </div>
    }
}

/* props 定义绑定 */
class Index extends React.Component{
    state={  
        mes: "hello,React"
    }
    node = null
    say= () =>  this.setState({ mes:'let us learn React!' })
    render(){
        return <div>
            <PropsComponent  
               mes={this.state.mes}  // ① props 作为一个渲染数据源
               say={ this.say  }     // ② props 作为一个回调函数 callback
               Component={ ChidrenComponent } // ③ props 作为一个组件
               renderName={ ()=><div> my name is alien </div> } // ④ props 作为渲染函数
            >
                { ()=> <div>hello,world</div>  } { /* ⑤render props */ }
                <ChidrenComponent />             { /* ⑥render component */ }
            </PropsComponent>
        </div>
    }
}
```

如上代码，我们看一下props可以是什么？

- props作为子组件渲染数据源；
- props作为一个通知父组件的回调函数；
- props作为一个单纯的组件传递；
- props作为渲染函数；
- render props 和 第四点的区别是放在了children属性上；
- render component插槽组件。

如上props在组件实例上是什么样子：

```PropsComponent```如果是一个类组件，那么可以直接通过this.props访问到它。在标签内部的属性和方法会直接绑定在props对象的属性上，对于组件的插槽会被绑定在props的children属性中。

### 2 React如何定义的props?

**React组件层级看待props充当的角色**

一方面父组件props可以把数据层传递给子组件去渲染消费。另一方面子组件可以通过props中的callback，来向父组件传递信息。还有一种可以将视图容器作为props进行渲染。

**从React更新机制中看待props充当的角色**

在React中，无法直接监测出数据更新波及到的范围，props可以作为组件是否更新的重要准则，变化即更新，于是有了PureComponent，memo等性能优化方案。

**从React插槽层面props充当的角色** React可以把组件闭合标签里的插槽，转化成children属性。

### 3 监听props改变

**类组件中**

componentWillReceiveProps 可以作为监听props的生命周期，但是React已经不推荐使用componentWillReceiveProps,未来版本可能会被废弃。于是出现了这个生命周期的替代方案，getDerivedStateFromProps。

**函数组件**

函数组件同理可以用useEffect来作为props改变后的监听函数。（useEffect初始化会默认执行一次）

```javascript
React.useEffect(() => {
    console.log("props改变", props.number)
}, [props.number])
```

### 4 props children模式

props + children 模式在react中非常常用，比如react-router中的Switch 和 Route, antd中的Form 和 FormItem。 

一起来看看prop + children的几种情况。

**props 插槽组件**
```javascript
<Container>
   <Children />
</Container>
```

上述可以在Container组件中，通过props.children属性访问到Children组件，为React element对象。

作用：

- 可以根据需要来控制Children是否渲染。
- Container可以用React.cloneElement强化props，或者修改Children的子元素。

**render props模式**

```javascript
<Container>
    { (ContainerProps) => <Children {...ContainerProps} /> }
</Container>
```

这种情况，在Container中，props.children属性访问到的是函数，并不是React element对象，针对这种情况，是不能直接渲染的，直接渲染会报错。

```javascript
function Container(props) {
    return props.children
}
```

改一下方式，就可以了。

```javascript
function Container(props) {
    const ContainerProps = {
        name: "guozhaoxi",
        age: 18
    }
    return props.children(ContainerProps)
}
```

作用：

- 根据需要来控制Children渲染与否。
- 可以将需要传给Children的props直接通过函数参数的方式传递给执行函children。

**混合模式**

如果Container的children既有函数也有组件，那么这种情况该怎么处理呢？
```javascript
<Container>
    <children />
    { (ContainerProps) => <Children {...ContainerProps} name="guozhaoxi"/> }
</Container>
```

```javascript
const Children = (props) => (<div>
    <div>Hello my name is {props.name}</div>
    <div>{props.mes}</div>
</div>)

function Container(props) {
    const ContainerProps = {
        name: "guozhaoxi",
        mes: "welcome to sjz"
    }
    return props.children.map(item => {
        if (React.isValidElement(item)) {
            return React.cloneElement(item, {...ContainerProps}, item.props.children)
        } else if (typeof item === "function") {
            return item(ContainerProps)
        } else return null
    })
}

const Index = () => {
    return <Container>
        <Children />
        { (ContainerProps) => <Children {...ContainerProps} name="guozhaoxi"/> }
    </Container>
}
```
这种情况需要先遍历 children，判断children元素类型：
- 针对element节点，通过cloneElement混入props;
- 针对函数，直接传递参数，执行函数。

### 5 操作props的小技巧

#### 抽象props

抽象props一般用于跨层级传递props,一般不需要具体指出props中某个属性，而是将props直接传入或者是抽离到子组件中。

**混入props**

```javascript
function Son(props) {
    console.log(props)
    return <div>Hello, World.</div>
}

function Father(props) {
    const fatherProps = {
        name: 'father'
    }
    return <Son {...props} {...fatherProps} />
}

function Index() {
    const indexProps = {
        name: 'father'
    }
    return <Father {...indexProps} />
}

```

Father组件一方面直接将Index组件indexProps抽象传递给Son, 一方面混入fatherProps。


**抽离props**

有的时候想要做的恰恰和上面相反，比如想要从父组件props中抽离某个属性，再传递给子组件，那么应该怎么做呢？

```javascript
function Son(props) {
    console.log(props)
    return <div>hello, wolrd</div>
}

function Father(props) {
    const { age, ...fatherProps } = props
    return <Son {...fatherProps}/>
}

function Index() {
    const indexProps = {
        name: 'father',
        age: 18,
        mes: 'hello erdan'
    }
    return <Father {...indexProps} />
}

``` 

#### 注入props

**显示注入props**

显示注入props,就是能够直观看见标签中绑定的props。

```javascript
function Son(props) {
    console.log(props)
    return <div>hello, world</div>
}

function Father(prop) {
    return prop.children
}

function Index() {
    return <Father>
        <Son name="guoerdan" age="18"/>
    </Father>
}
```

**隐式注入props**

这种方式，一般通过```React.cloneElement``` 对props.children克隆再混入新的props。

```javascript
function Son(props) {
    console.log(props)
    return <div>hello, world</div>
}

function Father(prop) {
    return React.cloneElement(prop.children, {mes: "welcopme to sjz"})
}

function Index() {
    return <Father>
        <Son name="guoerdan" age="18"/>
    </Father>
}
```

如上所示，将mes属性，隐式注入到了Son的props中。

## 实践加深印象

### 实现一个简单的`<Form> <FormItem>`组件

- ```<Form>``` 负责管理表单的状态
- ```<FormItem>``` 负责管理```<Input>```输入框组件

编写的组件能够实现的功能是：
- ```Form```组件可以被ref获取实例。然后可以调用```submitForm```方法获取表单内容，用于提交表单；```resetForm```方法用于重置表单。
- ```Form```组件自动过滤掉除了```FormItem```组件之外的React元素。
- ```FormItem```组件的name属性作为表单提交时的key,还有展示的label。
- ```FormItem```组件可以自动收集```<Input/>```表单的值。

**组件使用**

```javascript
export default () => {
    const form = useRef(null)
    const submit = () => {
        form.current.submitForm((formValue) => {
            console.log(formValue)
        })
    }
    const resetForm = () => {
        form.current.resetForm()
    }

    return <div className="box">
        <Form ref={form}>
            <FormItem name="name"  label="我是">
                <Input />
            </FormItem>
            <FormItem name="mes" label="我想对大家说">
                <Input />
            </FormItem>
            <input placeholder="不需要的input"/>
            <Input />
        </Form>
        <div className="btns">
            <button className="searchbtn" onClick={ submit }>提交</button>
            <button className="cancelbtn" onClick={ resetForm }>重置</button>
        </div>
    </div>
}
```

#### 编写```<Form>```

```javascript
class Form extends React.Component({
    state = {
        formData: {}
    }
    /* 提交表单数据 */
    submitForm = (cb) => {
        cb({...this.data.formData})
    }
    /* 重置表单 */
    resetForm = () => {
        const { formData } = this.state
        Object.keys(formData).forEach(item => {
            formData[item] = ""
        })
        this.setData({
            formData
        })
    }
    /* 设置表单数据 */
    setValue = (name, value) => {
        this.setData({
            ...this.data.formData,
            [name]: value
        })
    }
    render() {
        const { children } = this.props
        const renderChildren = []
        React.children.forEach(children, (child) => {
            if (child.type.displayName === "formItem") {
                const { name } = this.props
                /* 克隆FormItem 节点，混入改变表单单元项的方法 */
                const Children = React.cloneElement(child, {
                    key: name,
                    handleChange: this.setValue,
                    value: this.state.formData[name] || ""
                }, this.props.children)
                renderChildren.push(Children)
            }
        })
        return renderChildren
    }
})

Form.displayName = "form"
```

#### 编写 ```<FormItem>```

```javascript
function FormItem(props) {
    const { label, name, value, handleChange, children } = this.props
    const onChange = (value) => {
        handleChange(name, value)
    }
    return <div className="form">
        <span className="label">{ label }</span>
        {
            React.isValidElement(children) && children.type.displayName === "input"
            ? React.cloneElement(children, { onChange, value })
            : null
        }
    </div>
}
FormItem.displayName = "formItem"
```

#### 编写```<Input>```

```javascript
function Input({onChange, value}) {
    return <input className="input" onChange = {  (e) => ( onChange && onChange(e.target.value) ) } value={value}/>
}

Input.displayName = "input"
```