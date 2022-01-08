import Vue from "vue";
/**
 * styleguist样式定制
 */
import "./custom.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import { setEnv } from "../src";
Vue.use(Antd);

setEnv("test");
