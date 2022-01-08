import moment from 'moment';
import Cookies from 'js-cookie';

export default {
  // 获取头像颜色
  getAvatarColor(name) {
    if (name) {
      const COLOR_LIST = [
        '#5671FF',
        '#56C6FF',
        '#FAAD14',
        '#F56649',
        '#826AF9',
        '#5D7092',
        '#FFE853',
        '#5AD8A6',
        '#FF99C3',
        '#1E9493',
      ];
      let str = '';
      str = parseInt(name.slice(0, 1).charCodeAt(), 10);
      return COLOR_LIST[str % 10];
    }
    return false;
  },
  // 获取cookie、
  getCookie(name) {
    let arr;
    let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if ((arr = document.cookie.match(reg))) {
      return decodeURIComponent(arr[2]);
    }
    return null;
  },

  // 设置cookie,增加到vue实例方便全局调用
  setCookie(c_name, value, expiredays = null, expireAtMidnight = false) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    if (expireAtMidnight) {
      exdate.setHours(23);
      exdate.setMinutes(59);
      exdate.setSeconds(59);
    }
    document.cookie = `${c_name}=${escape(value)};path=/;domain=.iyouke.com${
      expiredays == null ? '' : `;expires=${exdate.toGMTString()};`
    }`;
  },

  // 删除cookie
  delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = `${name}=${cval};domain=.iyouke.com;path=/;expires=${exp.toGMTString()}`;
    }
  },

  cleanCookie() {
    [
      'token',
      'sub_id',
      'masterAccountPhone',
      'isMasterAccount',
      'phoneNumber',
      'uid',
      'accountNum',
    ].forEach((key) => {
      Cookies.remove(key, {
        path: '/smp',
        domain: '.iyouke.com',
      });
      Cookies.remove(key, {
        path: '/',
        domain: '.iyouke.com',
      });
    });
  },

  addslashes(string) {
    /* eslint-disable */
    return string.replace(
      /[\/\[\]\(\)\|\$\*\?\+\-\_]/g,
      (m) =>
        ({
          "/": "\\/",
          "[": "\\[",
          "]": "\\]",
          "(": "\\(",
          ")": "\\)",
          "|": "\\|",
          $: "\\$",
          "*": "\\*",
          "?": "\\?",
          "+": "\\+",
          "-": "\\-",
          _: "\\_",
        }[m])
    );
  },

  isToday(signDate) {
    if (!signDate) {
      return false;
    }

    const currentDate = moment().format("YYYYMMDD");
    signDate = moment(signDate).format("YYYYMMDD");

    return signDate === currentDate;
  },

  // 时间区间转化
  formatSeconds(value) {
    if (!value) {
      return "-";
    }
    let theTime = parseInt(value);
    let middle = 0;
    let hour = 0;
    if (theTime > 60) {
      middle = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (middle > 60) {
        hour = parseInt(middle / 60);
        middle = parseInt(middle % 60);
      }
    }
    let result = `${parseInt(theTime)}秒`;
    if (middle > 0) {
      result = `${parseInt(middle)}分${result}`;
    }
    if (hour > 0) {
      result = `${parseInt(hour)}小时${result}`;
    }
    return result;
  },
};

// 当前页面是否为根页面
export const isRootPage = () => {
  let isRoot = false;
  if (
    navigator.userAgent.indexOf("MSIE") >= 0 &&
    navigator.userAgent.indexOf("Opera") < 0
  ) {
    // IE
    if (history.length > 0) {
      isRoot = true;
    }
  } else {
    //非IE浏览器
    if (
      navigator.userAgent.indexOf("Firefox") >= 0 ||
      navigator.userAgent.indexOf("Opera") >= 0 ||
      navigator.userAgent.indexOf("Safari") >= 0 ||
      navigator.userAgent.indexOf("Chrome") >= 0 ||
      navigator.userAgent.indexOf("WebKit") >= 0
    ) {
      if (window.history.length > 1) {
        isRoot = true;
      }
    }
  }
  return isRoot;
};
