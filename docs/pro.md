### 业务组件

#### 定义

在项目中，跨页面复用的需要与`后端数据`或`业务策略`耦合的组件，比如数据格式有与后端约定、需要组件内置接口调用等，如批量打标签、添加附件、联系客服等

#### 接口调用的鉴权如何完成

通过同域名的cookie共享策略完成

```js
const currentUrl = encodeURIComponent(location.href);

const loginUrl = 'https://smp-test.iyouke.com/smp/login?redirect=' + currentUrl;

const login = () => location.href = loginUrl;

const state = {
  // testCorpid: 'wwdc814c1794ecbabc',
  testCorpid: 'ww4eb0873043d53d43',
  isSettingCorpid: !!localStorage.getItem('corpId') === 'ww4eb0873043d53d43',
  isLogin: !!document.cookie.match('token'),
};

const setCorpid = function(value) {
  localStorage.setItem('corpId', value);
  state.isSettingCorpid = true;
};

const getCookie = (name) => {
  let arr;
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  }
  return null;
};

const uid = getCookie('uid');
if (uid) {
  localStorage.setItem('uid', uid);
}

<h3>当前登录态：{{state.isLogin ? '已' : '未'}}登录</h3>

<a-space direction="vertical">
  <a-input-search
    placeholder="输入corpid"
    :enter-button="(state.isSettingCorpid ? '已' :'') + '设置'"
    size="large"
    v-model="state.testCorpid"
    :disabled="state.isSettingCorpid"
    @search="setCorpid"
  />

  <a-button @click="login" type="primary" :disabled="state.isLogin">{{state.isLogin ? '已' : '去'}}登录</a-button>
</a-space>
```
