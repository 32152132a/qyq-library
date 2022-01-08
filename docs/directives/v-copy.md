### v-copy

v-copy
复制到剪切板 _ 静态值调用形式: v-copy="'要复制的值'"， _

#### 基础用法

```js
<a-button v-copy="'复制的值'">点击复制</a-button>
```

#### 动态值调用形式

> 比如变量为 demo v-copy:[demo] 即可 \* \*

```js
let value=123
<a-button v-copy:[value]>点击复制</a-button>
```

#### 复制成功提示

> （需 Vue 实例支持 this.$message.success） _ 默认：开启 _

```js
<a-button v-copy="'复制的值'">点击复制</a-button>
```

#### 取消复制成功提示

> v-copy.silence

```js
<a-button v-copy.silence="'复制的值'">点击复制</a-button>
```
