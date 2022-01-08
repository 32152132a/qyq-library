import { COLOR, DATE_FORMAT, RULE_TYPE_VALUES } from './../constants';
import moment from 'moment';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import lodashIsEmpty from 'lodash/isEmpty';
export default {
  /*
   * url 请求地址
   * query 传惨
   * fileName 返回的文件名
   **/
  download: async (url, query, fileName) => {
    try {
      let { data } = await url(query);
      const blob = new Blob([data], {
        type: 'application/vnd.ms-excel,charset=utf-8',
      });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //msSaveOrOpenBlob方法返回bool值
        window.navigator.msSaveBlob(blob, fileName); //本地保存
      } else {
        const eLink = document.createElement('a');
        eLink.download = fileName;
        eLink.style.display = 'none';
        eLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eLink);
        eLink.click();
        URL.revokeObjectURL(eLink.href); // 释放URL 对象
        document.body.removeChild(eLink);
      }
    } catch (e) {
      console.log(e);
    }
  },
  //  number 转换成字符
  fromCharCode(num) {
    let fromCharCodeItem = (item) => {
      let i = Number(item);
      return {
        text: `${String.fromCharCode((i % 26) + 65)}${
          parseInt(i / 26) > 0 ? parseInt(i / 26) : ''
        }`,
        color: COLOR[i % COLOR.length],
      };
    };
    if (Array.isArray(num)) {
      return num.map((item) => {
        return fromCharCodeItem(item);
      });
    } else {
      return fromCharCodeItem(num);
    }
  },
  // 格式化时间
  /*
   * date时间
   * format 时间格式
   */
  formatDate(date, format = DATE_FORMAT) {
    if (Array.isArray(date)) {
      return date.map((item) => {
        return moment.isMoment(item) ? item.format(format) : item;
      });
    } else if (moment.isMoment(date)) {
      return date.format(format);
    } else {
      return date;
    }
  },

  // 取出下拉框的第一项
  firstSelect(options) {
    for (let item in options) {
      if (options[item] && !options[item].disabled) {
        if (options[item].value) {
          return Array.isArray(options[item].value)
            ? options[item].value[0]
            : options[item];
        } else {
          return options[item];
        }
      }
    }
    return {};
  },

  // 防抖
  debounce(fn, time) {
    let timeout = null;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
      }, time);
    };
  },
  // 去除规则空值
  formatRule(rule, isFormat = true) {
    let isEmpty = false;
    let arrFuntion = [
      RULE_TYPE_VALUES.NOT_NULL,
      RULE_TYPE_VALUES.NULL,
      RULE_TYPE_VALUES.IS_SET,
      RULE_TYPE_VALUES.NOT_SET,
      RULE_TYPE_VALUES.HAVE,
      RULE_TYPE_VALUES.NONE,
    ];
    // 判断是不是空值 通过params判断
    if (Array.isArray(rule.rules)) {
      isEmpty = rule.rules.some((item) => {
        if (item.rules) {
          return item.rules.some((itemC) => {
            // itemC 有值 但是是二级结构

            let isRuleNull = (isRule) => {
              let isRuleNullKey = false;
              // 五种情况 itemC为空对象
              if (Object.keys(isRule).length === 0) {
                isRuleNullKey = true;
              }
              // function 为null
              if (!isRule.function) {
                isRuleNullKey = true;
              }
              // isRule.function 为真为假 没有 params
              // isRule 有值 但是 params为空
              // params有可能是 [null]
              if (
                (isRule.params && isRule.params.length > 0) ||
                arrFuntion.includes(isRule.function)
              ) {
                let isParams = isRule.params.some((itemParams) => {
                  return isNull(itemParams) || isUndefined(itemParams);
                });
                if (isParams && !arrFuntion.includes(isRule.function)) {
                  isRuleNullKey = true;
                }
              } else {
                isRuleNullKey = true;
              }
              // 行为分析 判断 ‘并且满足’输入框 为不为空
              let filters = (filter) => {
                let isFilter = false;
                if (
                  arrFuntion.includes(filter.function) ||
                  (filter.field &&
                    filter.function &&
                    filter.params &&
                    filter.params.length > 0)
                ) {
                  let isFilterKey = filter.params.some((itemParams) => {
                    return isNull(itemParams) || isUndefined(itemParams);
                  });
                  if (isFilterKey && !arrFuntion.includes(filter.function)) {
                    isFilter = true;
                  }
                } else {
                  isFilter = true;
                }
                return isFilter;
              };
              if (isRule.filters) {
                if (isRule.filters.subFilters) {
                  if (
                    isRule.filters.subFilters.some((itemS) => {
                      return filters(itemS);
                    })
                  ) {
                    isRuleNullKey = true;
                  }
                } else {
                  if (filters(isRule.filters)) {
                    isRuleNullKey = true;
                  }
                }
              }

              return isRuleNullKey;
            };

            if (itemC.rules) {
              if (
                itemC.rules.some((itemCC) => {
                  return isRuleNull(itemCC);
                })
              ) {
                return true;
              }
            } else {
              if (isRuleNull(itemC)) {
                return true;
              }
            }
          });
        } else {
          return false;
        }
      });
    }
    // 保留属性行为 未添加值传空对象
    if (Array.isArray(rule.rules) && !isEmpty && isFormat) {
      rule.rules = rule.rules.map((item) => {
        return Object.keys(item).length === 0 || item.rules.length === 0
          ? {}
          : item;
      });

      isEmpty = rule.rules.every((item) => {
        return lodashIsEmpty(item);
      });
    }

    return isEmpty;
  },
  find(str, cha, num) {
    let x = str.indexOf(cha);
    for (let i = 0; i < num; i++) {
      x = str.indexOf(cha, x + 1);
    }
    return x;
  },

  // 头像颜色
  getAvatarBgColor(name) {
    if (name) {
      let str = parseInt(name.slice(0, 1).charCodeAt(0), 10);
      return COLOR[str % 10];
    } else {
      return;
    }
  },

  text_filter(string, tips = '') {
    string = string.replace(/\[/gi, '.').replace(/\]/gi, '');
    let arr = string.split('.');
    let currentItem = null;
    let e = arr.every((item) => {
      return (currentItem = currentItem ? currentItem[item] : this[item]);
    });
    return e ? currentItem : tips;
  },

  /**
   * selectFile 选择本地文件
   * @param {*} typeArray 所有支持的类型
   * @param {*} multiple 是否选择多文件
   */

  selectFile(typeArray, multiple = false) {
    return new Promise((resolve) => {
      var el = document.createElement('input');
      el.setAttribute('type', 'file');
      el.setAttribute('accept', typeArray.join(','));
      el.setAttribute('multiple', multiple);
      el.style.display = 'none';
      el.addEventListener('change', function (e) {
        if (multiple) {
          resolve(e.target.files);
        } else {
          resolve(e.target.files[0]);
        }
        document.body.removeChild(e.target);
      });
      document.body.appendChild(el);

      el.dispatchEvent(
        new MouseEvent('click', {
          // view: window,
          bubbles: true,
          cancelable: true,
        }),
      );
    });
  },
};
