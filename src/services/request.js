import axios from "axios";
import { message } from "ant-design-vue";
import apiConfig from "./config";
import { EventBus } from "@/services/event-bus.js";
import Utils from "@/common/js/utils.js";

EventBus.$off("setEnv");
EventBus.$on("setEnv", (env) => {
  axios.defaults.baseURL = apiConfig[env].VUE_APP_API_DOMAIN + "/api/";
  baseUrlMap.baseURL = apiConfig[env].VUE_APP_API_DOMAIN + "/api/";
  baseUrlMap.javaApi = apiConfig[env].VUE_APP_JAVA_API_DOMAIN;
});

// const axios = axios;
let baseUrlMap = {
  baseURL: "",
  javaApi: "",
};

axios.defaults.timeout = 30 * 1000;
//需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
axios.interceptors.request.use((config) => {
  if (Utils.getCookie("token")) {
    config.headers.Authorization = "Bearer " + Utils.getCookie("token");
  }

  // App.vue中，请求后端接口后进行动态注入
  const { javaApiList = [] } = axios;
  if (javaApiList.find((api) => api.indexOf(config.url) > -1)) {
    config.baseURL = baseUrlMap.javaApi + "/api/";
  }

  // 判断是否含有japi，有则直接请求java
  if (config.url.indexOf("japi") > -1) {
    config.baseURL = baseUrlMap.javaApi;
  }

  if (typeof config.data == "undefined") {
    config.data = {};
  }
  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // 超时提醒
    if (
      error instanceof Error &&
      typeof error.message === "string" &&
      error.message.toLowerCase().startsWith("timeout of")
    ) {
      showAxiosTimeoutMessage();
      return Promise.reject(error);
    }

    if (typeof error.retry_config == "undefined") {
      return Promise.reject(error);
    } else {
      let config = error.retry_config;
      var backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, 100);
      });

      return backoff.then(function () {
        return axios(config);
      });
    }
  }
);

let isAxiosNetworkTimeoutMessageClosed = true;
function showAxiosTimeoutMessage() {
  if (!isAxiosNetworkTimeoutMessageClosed) {
    return;
  }
  isAxiosNetworkTimeoutMessageClosed = false;
  message.error("网络超时错误", 3, () => {
    isAxiosNetworkTimeoutMessageClosed = true;
  });
}

export default axios;
