export const PLATFORM = 'scrm';
export const TYPE = {
  TYPE_TEXT: '1',
  TYPE_SINGLE_SELECT: '2',
  TYPE_MULTIPLE_SELECT: '3',
  TYPE_DATE: '4',
  TYPE_PHONE: '5',
  TYPE_MAIL: '6',
  TYPE_AREA: '7',
  TYPE_IMG: '8',
};
// 属性规则颜色
export const COLOR = [
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
export const ORDER_SELECT = [
  { label: '没有创建交易', value: 1 },
  { label: '等待买家付款', value: 2 },
  { label: '买家部分付款', value: 3 },
  { label: '卖家部分发货', value: 4 },
  { label: '买家已付款', value: 5 },
  { label: '卖家已发货', value: 6 },
  { label: '交易成功', value: 7 },
  { label: '退款成功', value: 8 },
  { label: '主动关闭交易', value: 9 },
  { label: '交易异常', value: 10 },
  { label: '已签收', value: 11 },
  { label: '申请退款', value: 12 },
];

// 输入框非空正则
export const NOT_EMPTY_INPUT_RULE =
  '[`~!@#$^&*()=|{}\':;\',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？ ]';

export const COS_URL = 'http://b1.dtminds.com';
// type总共8种类型 1文本 2单选 3多选 4日期 5手机号 6邮箱 7区域 8图片

export const TYPES = {
  BOOLEAN: 'boolean',
  DATE: 'date',
  INTEGER: 'integer',
  STRING: 'string',
};

export const RULE_TYPE_VALUES = {
  DEFAULT: '',
  RELATIVE: 'relative',
  ABSOLUTE: 'absolute',
  // FUTURE: 'future',
  WITHIN: 'within',
  AFTER: 'after',
  BETWEEN: 'between',
  IS_SET: 'true',
  NOT_SET: 'false',
  NULL: 'null',
  NOT_NULL: 'notNull',
  BEFORE: 'before',
  RELATIVE_BETWEEN: 'relative_in',
  HAVE: 'have',
  NONE: 'none',
};
export const RULE_TYPES = {
  GROUP: 'group',
  LABEL: 'label',
  PROPERTY: 'property',
};
export const RULE_DATE_OPTIONS = [
  { name: '绝对时间', value: RULE_TYPE_VALUES.ABSOLUTE },
  { name: '相对当前时间点', value: RULE_TYPE_VALUES.RELATIVE },
  {
    name: '相对当前时间区间',
    value: RULE_TYPE_VALUES.RELATIVE_BETWEEN,
  },
  { name: '有值', value: RULE_TYPE_VALUES.IS_SET },
  { name: '没值', value: RULE_TYPE_VALUES.NOT_SET },
];
export const RULE_DATE_RELATIVE_OPTIONS = [
  { name: '过去', value: RULE_TYPE_VALUES.DEFAULT },
  // { name: '未来', value: RULE_TYPE_VALUES.FUTURE },
];
export const RULE_DATE_RELATEIVE_NAMES = {
  [RULE_TYPE_VALUES.DEFAULT]: '过去',
  // [RULE_TYPE_VALUES.FUTURE]: '未来',
};
export const RULE_DATE_RELATIVE_EXTRA_OPTIONS = [
  { name: '之前', value: RULE_TYPE_VALUES.BEFORE },
  { name: '之内', value: RULE_TYPE_VALUES.WITHIN },
];
export const RULE_BOOLEAN = [
  { name: '为真', value: RULE_TYPE_VALUES.TRUE },
  { name: '为假', value: RULE_TYPE_VALUES.FALSE },
];
export const RULE_EVENT_ACTION = [
  { name: '未做过', value: 0 },
  { name: '做过', value: 1 },
];

export const DEFAULT_EVENT_RULE = {
  type: 'event_rule',
  function: '=',
  measure: {},
  params: [],
  time_params: ['1 day'],
};
export const DEFAULT_RULE = {
  type: 'rules_relation',
  relation: 'and',
  rules: [],
};
export const GEN_DEFAULT_SINGLE_LAYER = (name, id) => ({
  name,
  id,
  note: '',
  relation: 'and',
  rules: [{}, {}],
  type: 'rules_relation',
});
export const DEFAULT_LAYERS = [GEN_DEFAULT_SINGLE_LAYER('分层1', 1)];

// -1：全部、0：待审核、1：已审核、2：审核失败3.后台审核通过4.后台审核不通过
export const SMS_TEMPLATE_STATUS = {
  ALL: -1,
  AUDIT_WAIT: 0,
  AUDIT_PASS: 1,
  AUDIT_FAIL: 2,
  AUDIT_BOSS_PASS: 3,
  AUDIT_BOSS_FAIL: 4,
};
export const PASSWORD_REDPACK_STATUS_CODE = {
  INIT: 0,
  NOT_START: 1,
  RUNNING: 2,
  EXPIRED: 3,
  INVALID: 4,
  PAUSE: 5,
};
export const PASSWORD_REDPACK_STATUS_TYPE = {
  [PASSWORD_REDPACK_STATUS_CODE.INIT]: 'init',
  [PASSWORD_REDPACK_STATUS_CODE.NOT_START]: 'not-start',
  [PASSWORD_REDPACK_STATUS_CODE.RUNNING]: 'running',
  [PASSWORD_REDPACK_STATUS_CODE.EXPIRED]: 'expired',
  [PASSWORD_REDPACK_STATUS_CODE.INVALID]: 'invalid',
  [PASSWORD_REDPACK_STATUS_CODE.PAUSE]: 'pause',
};
export const PASSWORD_REDPACK_STATUS = {
  [PASSWORD_REDPACK_STATUS_CODE.INIT]: '初始化',
  [PASSWORD_REDPACK_STATUS_CODE.NOT_START]: '未开始',
  [PASSWORD_REDPACK_STATUS_CODE.RUNNING]: '进行中',
  [PASSWORD_REDPACK_STATUS_CODE.EXPIRED]: '已过期',
  [PASSWORD_REDPACK_STATUS_CODE.INVALID]: '失效',
  [PASSWORD_REDPACK_STATUS_CODE.PAUSE]: '已暂停',
};
export const PASSWORD_REDPACK_STATUS_OPTIONS = [
  { label: '初始化', value: 0 },
  { label: '未开始', value: 1 },
  { label: '进行中', value: 2 },
  { label: '已过期', value: 3 },
  { label: '失效', value: 4 },
  { label: '已暂停', value: 5 },
];
// 口令和红包类型选项
export const COMMAND_TYPE_OPTIONS = [
  { label: '一条一令', value: 1 },
  { label: '通用口令', value: 2 },
];
export const REDPACK_TYPE_OPTIONS = [
  { label: '固定金额', value: 1 },
  { label: '随机金额', value: 2 },
];
// 口令类型
export const COMMAND_TYPE_CODE = {
  EACH: 1,
  COMMON: 2,
};
export const COMMAND_TYPE = {
  [COMMAND_TYPE_CODE.EACH]: '一条一令',
  [COMMAND_TYPE_CODE.COMMON]: '通用口令',
};
// 红包类型
export const REDPACK_TYPE_CODE = {
  FIXED: 1,
  RANDOM: 2,
};
export const REDPACK_TYPE = {
  [REDPACK_TYPE_CODE.FIXED]: '固定金额',
  [REDPACK_TYPE_CODE.RANDOM]: '随机金额',
};
// 口令红包领取状态
export const RECEIVE_STATUS_OPTIONS = [
  { label: '领取失败', value: -1 },
  { label: '领取成功', value: 1 },
  { label: '手动发放', value: 2 },
];
// 客户状态
export const CUSTOMER_STATUS_CODE = {
  NOT_ADD: -1,
  BUSINESS_USER: 0,
  LOST_CUSTOMER: 1,
};
export const CUSTOMER_STATUS = {
  [CUSTOMER_STATUS_CODE.NOT_ADD]: '未添加',
  [CUSTOMER_STATUS_CODE.BUSINESS_USER]: '企业客户',
  [CUSTOMER_STATUS_CODE.LOST_CUSTOMER]: '流失客户',
};
export const DATE_FORMAT = 'YYYY-MM-DD';

export {
  TYPE_CODE,
  TYPE_MODAL_TITLE,
  TYPE_NUM,
  TYPE_NAME,
  FILE_TYPE,
  SMS_STATUS_CODE,
  STATISTICS_CODE,
  STATISTICS_NAME,
  TABS_CODE,
  TABS_NAME,
  STATISTICS,
} from './material';
