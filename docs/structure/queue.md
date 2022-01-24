# 数据结构之队列

### 栈和队列
在 JavaScript 中，栈和队列的实现一般都要依赖于数组，大家完全可以把栈和队列都看作是“特别的数组”。

两者的区别在于，它们各自对数组的增删操作有着不一样的限制。

因此，在学习栈与队列之前，我们需要先来明确一下数组中的增删操作具有什么样的特性、对应的方法有哪些：

**数组中增加元素的三种方法**

`unshift`-添加元素到数组的头部

```javascript
const arr = [1, 2]
arr.unshift(0)  // [0, 1, 2]
```

`push`-添加元素到数组的尾部

```javascript
const arr = [1, 2]
arr.push(3) // [1, 2, 3]
```

`splice`-添加元素到数组的任意位置

```javascript
const arr = [1, 2]
arr.splice(1, 0, 3) // [1,3,2] 
```

splice用法：第一个参数为起始的索引值，第二个参数为从索引开始要删除的元素个数，第三个位置开始的入参是要添加到数组中元素的值。

**数组中删除元素的三种方法**

`shift`-删除数组头部的元素

```javascript
const arr = [1, 2, 3]
arr.shift()  // [2, 3]
```

`pop`-删除数组的尾部元素

```javascript
const arr = [1, 2, 3]
arr.pop()  // [1, 2]
```

`splice`-删除任意位置的元素

```javascript
const arr = [1, 2, 3]
arr.splice(1, 1) // [1, 3]
```

### 介绍队列

队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

在现实中，最常见的队列的例子就是排队。在电影院、自助餐厅、杂货店收银台，我们都会排队。排在第一位的人会先接受服务。

### 创建队列

```javascript
class Queue{
	constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {}
  }
}
```
这个队列类有一些方法可以供我们使用，我们来简单的介绍一下它们：

- `enqueue(elements)`: 向队列尾部添加一个（或多个）新的项
- `dequeue()`: 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素
- `peek()`: 返回队列中第一个元素——最先被添加，也将是最先被移除的元素
- `isEmpty()`: 如果队列中不包含任何元素，返回 true，否则返回 false
- `size()`: 返回队列包含的元素个数，与数组的 length 属性类似
- `clear()`: 清空队列

构思好了以上几个方法以后，我们接下来逐一实现它们。

**enqueue**

```javascript
enqueue(element) {
    this.items[this.count] = element
    this.count++
}
```

**dequeue**

```javascript
dequeue() {
    if (this.isEmpty()) {
        return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
}
```

**peek**

```javascript
peek() {
  if (this.isEmpty()) {
  	return undefined;
  }
	return this.items[this.lowestCount];
}
```

**isEmpty**

```javascript
isEmpty() {
	return this.count - this.lowestCount === 0
}
```

**size**

```javascript
size() {
	return this.count - this.lowestCount;
}
```

**toString**

```javascript
toString() {
  if (this.isEmpty()) {
    return ''
  }
  let objString = `${this.items[this.lowestCount]}`
  for(let i = this.lowestCount + 1; i < this.count; i++) {
  	objString = `${objString}, ${this.items[i]}`
  }
  return objString
}
```