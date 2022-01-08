// 导入组件
// import message from "./message/src/message.vue";
import { EventBus } from "@/api/event-bus.js";
import Vue from 'vue'
import Antd from 'ant-design-vue'

import DtSearchMember from "@/components/pro/DtSearchMember/DtSearchMember.vue";

Vue.use(Antd)
// 存储组件列表
export const packageComponents = [
  // message,
  DtSearchMember,
];

packageComponents.forEach(component => {

  component.install = function (Vue) {
    Vue.component(component.name, component);
  }
});

export const setEnv = (env) => {
  EventBus.$emit("setEnv", env);
  console.log("🚀 ~ file: index.js ~ line 20 ~ install ~ 测试获取主项目中的环境变量env", env);
}

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, env) {
  // 判断是否安装
  if (install.installed) return;
  // 判断是否可以正确接受第二个参数
  if (env) {
    setEnv(env)
  }
  // 遍历注册全局组件
  packageComponents.map((component) =>
    Vue.component(component.name, component)
  );
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  // message,
  DtSearchMember,
};
