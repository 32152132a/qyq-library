企业成员逻辑：

- 可见性，如果不可见，那么接口不返回不可见的成员数据
- [todo]禁用状态，对应对应字段为disabled，默认都过滤掉

特性：

- 默认展开第一级的成员树

基础用法

```js
let selectedMembers = [];

<dt-search-member
  :checkable = "true"
  v-model = "selectedMembers"
></dt-search-member>

```
