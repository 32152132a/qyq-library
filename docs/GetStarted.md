## Get Started

_前置：安装依赖 `npm i`_

### 启动开发

```bash
npm run doc
```

访问本地：<http://localhost:1314>

#### _启动开发（包含业务组件）_

本地改hosts，使用iyouke.com域名下的域名访问，可以保存登录态。举例如下：

hosts文件

```md
127.0.0.1 smp-dev.iyouke.com
```

对应访问路径为：<http://smp-dev.iyouke.com:1314>

### 新增组件

#### 基础组件

1. `components`目录下创建目录`DtXxx`
2. `DtXxx`下创建`DtXxx.vue`、`DtXxx.md`文件
3. 重启文档服务

#### 业务组件

1. `components/pro`目录下创建目录`DtXxx`
2. `DtXxx`下创建`DtXxx.vue`、`DtXxx.md`文件
3. 重启文档服务

### 组件编写

组件本身的编写以`JSDOC风格的注释`为主，具体参考[官方文档](https://vue-styleguidist.github.io/docs/Documenting.html#code-comments)

部分常用注释：

- 块注释，比如`/** Description of prop "foo". */`
  - 属性声明
- @example 示例文档
- @public 公共方法
- @param 方法参数
- @ignore 忽略的属性
- @event 事件
- @slot 插槽
- @values 属性的可用值，比如`@values small, normal, large`
- @deprecated 废弃
- @model 双向绑定

### 组件示例编写

> 组件示例代码的编写以`Markdown`为主，见以下示例

- Ant Design Vue 组件

````md
```vue
<a-button type="primary" ghost>按钮</a-button>
<br />
<br />
<a-tag color="blue">标签</a-tag>
```
````

_实际效果_

```vue
<a-button type="primary" ghost>按钮</a-button>
<br />
<br />
<a-tag color="blue">标签</a-tag>
```

- DtTag.md

````md
```vue
<dt-tags :tags="['1', '2', '3']" />
```
````

_实际效果_

```vue
<dt-tags :tags="['1', '2', '3']" />
```

- DtTags.md

````md
```vue
const tags = [ { labelName: '标签1', labelId: 1, }, { labelName: '标签2',
labelId: 2, }, ];

<div>
  <dt-tags :tags="tags" id="labelId" name="labelName">Default Example Usage</dt-tags>
</div>
```
````

_实际效果_

```vue
const tags = [ { labelName: '标签1', labelId: 1, }, { labelName: '标签2',
labelId: 2, }, ];

<div>
  <dt-tags :tags="tags" id="labelId" name="labelName">Default Example Usage</dt-tags>
</div>
```

### 附

#### 1. [UI 规范](https://lanhuapp.com/web/#/item/project/stage?tid=be82c329-8072-4185-a1d5-7cc6157d27f1&pid=ab00f729-0675-41e5-b339-9897763f0576)

#### 2. [组件开发认知](https://doc.dtminds.cn/pages/viewpage.action?pageId=4919407)

#### 3. [组件开发基础与规范](https://doc.dtminds.cn/pages/viewpage.action?pageId=4919931)
