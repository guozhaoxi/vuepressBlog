# BFC是什么
BFC是**Block Formatting Context**的缩写，我们可以直接将其翻译为"块级格式化上下文"。它会创建一个特殊的区域，在这个区域中，只有 **block box**参与布局；而BFC一系列特点和规则规定了在这个特殊的区域内如何进行布局，如何进行定位，区域内的相互关系和相互作用是怎样的。这个特殊的区域不受外界影响。

上面提到了 block box 的概念， block box 指的是display属性为block, list-item, table的元素。

## 如何形成BFC
那么什么样的元素会创建一个BFC呢？MDN对此的总结如下。
- 根元素或其他包含根元素的元素

- 浮动元素（元素的float不是none）

- 绝对定位元素（元素的position为absolute或fixed）

- 内联块（元素具有display:inline-block属性）

- 表格单元格（元素具有display:table-cell,HTML表格单元格默认属性）

- 表格标题（元素具有display:table-caption,HTML表格标题默认属性）

- 具有 overflow且值不是visible的块元素

- 含有样式属性 display:flow-root的元素

- 含有样式属性 column-span: all的元素

## BFC决定了什么
前面谈到了BFC的一套规则，这套规则的具体描述如下所示。

- 内部的box将会独占宽度，且在垂直方向上一个接一个排列。

- box在垂直方向上的间距由margin属性决定，但是同一个BFC的两个相邻的box的margin会出现边距折叠现象。

- 每个box在水平方向上的左边缘与BFC的左边缘相对齐，即使存在浮动也是如此。

- BFC区域不会与浮动元素重叠，而是会依次排列。

- BFC区域是一个独立的渲染容器，容器内的元素和BFC区域外的元素之间不会有任何干扰。

从这些规则中，我们至少可以总结出如下一些关键要点。

- 边距折叠

- 清除浮动

- 自适应多栏布局