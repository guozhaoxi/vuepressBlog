# 观察者模式

> 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听一个目标对象，当目标对象的状态发生改变时，会通知所有观察者对象，使他们能够自动更新。

在观察者模式里，有两个关键角色是一定要出现的——发布者和订阅者。用面向对象的方式表达的话，就是要有两个类。

思考一下发布者的类应该具备哪些能力？首先应该可以拉群（添加订阅者），然后是艾特所有人（通知所有订阅者），最后应该还具备一个踢人的能力（移除订阅者）。我们来定义一下这个发布者类。

```js
// 定义发布者类
class Publisher {
	constructor() {
		this.observers = []
		console.log('publisher created.')
	}
	// 增加订阅者
	add(observer) {
		this.observers.push(observer)
	}
	// 移除订阅者
	remove(observer) {
		this.observers.forEach((item, index) => {
			if (item === observer) {
				this.observers.splice(index, 1)
			}
		})
	}
	// 通知所有订阅者
	notify() {
		this.observers.forEach(observer => {
			observer.update()
		})
	}
}
```

接下来，我们思考一下作为订阅者应该具备哪些能力呢？其实订阅者的能力比较简单啦，作为被动的一方，无非就是被通知、去执行两种能力。下面，我们来定义一下订阅者类。

```js
class Observer {
	constructor() {
		console.log('observer created.')
	}
	update() {
		console.log('observer updated.')
	}
}
```

以上，我们就完成了最基本的发布者和订阅者类的编写和设计。在实际的业务开发中，我们所有的定制化的发布者/订阅者逻辑都可以基于这两个基本类来改写。

```js
// 定义一个具体的需求文档发布者类
class PrdPublisher extends Publisher {
	constructor() {
		super()
		// 需求文档还是空
		this.prdState = null
		// 韩梅梅还没有拉群
		this.observers = []
	}
	getState() {
		return this.prdState
	}
	setState(state) {
		// 改变需求文档的状态
		this.prdState = state
		// 通知所有订阅者
		this.notify()
	}
}
```

作为订阅方，开发者的任务也变的具体起来，拿到开发文档，工作起来。

```js
class DevloperObserver extends Observer {
	constructor() {
		super()
		// 需求文档一开始还不存在
		this.prdState = null
	}
	// 重写一个具体的Update方法
	update(prd) {
		this.prdState = prd
		this.work()
	}
	work() {
		const prd = this.prdState
		console.log('996 begin.')
	}
}
```

```js
const LiLei = new DevloperObserver();
const ZhangSan = new DevloperObserver();
const LiSi = new DevloperObserver();

const HanMeiMei = new PrdPublisher();
HanMeiMei.add(LiLei);
HanMeiMei.add(ZhangSan);
HanMeiMei.add(LiSi);

cosnt prd = {
  qd: '写一个页面',
  hd: '写一个接口',
  cs: '测试一下页面'
}

HanMeiMei.setState(prd)
```

::: tip 声明
本博客的设计模式相关的文章均是学习了掘金小册[《javaScript 设计模式核心原理与应用实践》](https://juejin.im/book/5c70fc83518825428d7f9dfb '《javaScript 设计模式核心原理与应用实践》')和腾讯大佬曾探写的[《javaScript 设计模式与开发实践》](http://product.dangdang.com/23698327.html '《javaScript 设计模式与开发实践》')一书。
:::
