# 栈

### 介绍

栈是一种遵循后进先出(LIFO)原则有序集合。新添加或待删除的元素都保存在栈的同一端，称为`栈顶`。另一端就叫做`栈底`。在栈里，新元素都靠近栈顶，旧元素都靠近栈底。

一个**Stack**类具备的几个方法介绍：

- `push(element)`: 添加一个或多个新元素到栈顶
- `pop()`: 移除栈顶元素并返回
- `peek()`: 返回栈顶元素，不对栈做任何修改
- `size()`: 返回栈里的元素个数
- `isEmpty()`: 如果栈里没有任何元素就返回true,否则返回false
- `clear()`: 清空栈,移除栈里所有元素


### 创建一个基于数组的栈

```javascript
class StackArray {
    constructor() {
        this.items = []
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length - 1]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }

    toArray() {
        this.items = []
    }

    toString() {
        return this.items.toString()
    }
}
```

### 创建一个基于JavaScript对象的Stack类

**为什么要用对象来创建一个Stack类？**

创建一个Stack类最简单的方式就是使用数组。我们在上面也已经实现了，但是在处理大量数据的时候，我们要考虑如何操作是最高效的。在使用数组的时候，大部分方法的时间复杂度是O(n)。也就是说我们需要迭代整个数组直到找到我们要找的那个元素，在最坏的情况下,要迭代数组的所有位置，n代表数组的长度。如果数组的元素足够多的话，我们需要的时间也就更长。

另外数组是元素的一个有序集合，为了保证元素排列顺序，它也会占用更多的内存空间。

```javascript
class Stack {
    constructor() {
        // 使用一个count属性来帮助我们记录栈的大小
        this.count = 0
        this.items = {}
    }

    push(element) {
        // 我们将使用count变量作为items对象的键名，插入的元素则是它的值
        this.items[this.count] = element
        // 在向栈插入元素后，我们递增count变量 
        this.count++
    }

    pop() {
        // 首先，我们需要检验栈是否为空,如果为空，就返回undefined
        if (this.isEmpty()) {
            return undefined
        }
        // 如果栈不为空的话，我们会将count属性减1
        this.count--
        // 保存栈顶的值
        const result = this.items[this.count]
        // 删除栈顶的值
        delete this.items[this.count]
        // 返回栈顶的值
        return result
    }
    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        // 访问栈顶元素
        return this.items[this.count-1]
    }

    isEmpty() {
        // 要验证栈是否为空，可以像下面这样判断count的值是否为0
        return this.count === 0
    }

    size() {
        // 返回count属性的值来实现size方法
        return this.count
    }

    clear() {
        // 遵循LIFO原则，来移除栈中所有元素
        // if (!this.isEmpty()) {
        //     this.pop()
        // }
        // 要清空该栈，只需要将它的值复原为构造函数中使用的值即可
        this.items = {}
        this.count = 0
    }

    toString() {
        // 如果栈是空的，我们只需返回一个空字符串即可
        if (this.isEmpty()) {
            return ''
        }
        // 如果它不是空的，就需要用它底部的第一个元素作为字符串的初始值
        let objString = `${this.items[0]}`
        // 迭代整个栈的键，一直到栈顶，添加一个逗号（,）以及下一个元素
        for (let i = 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`
        }
        // 返回字符串
        return objString
    }
}
```

### 用栈解决问题

**从十进制到二进制**

```javascript
export function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = '';

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}
```

**进制转换算法**

```javascript
export function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';

  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}
```

**有效括号(leet-code)**

题目描述：

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // 空字符串无条件判断为true
    if (!s) {
        return true
    }
    // 声明一个statck数组
    const stack = []
    // 缓存字符串长度
    const len = s.length
    // 遍历字符串
    for(let i = 0; i < len; i++) {
        // 缓存单个字符串
        const ch = s[i]
        // 判断是否是左括号
        if (ch === "(" || ch === "[" || ch === "{") stack.push(leftToRight[ch])
        // 如果不是左括号，那必须是和左括号相匹配的右括号
        else {
            // 若栈不为空，且位于栈顶的左括号没有和当前字符匹配上,判为无效
            if (!stack.length || stack.pop() !== ch) {
                return false
            }
        }
    }
    // 若所有的括号都能配对成功，那么最后栈应该是空的
    return !stack.length
};

// 用一个 map 来维护左括号和右括号的对应关系
const leftToRight = {
  "(": ")",
  "[": "]",
  "{": "}"
};
```