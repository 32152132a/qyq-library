export const TYPE_CODE = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  LINK: 'link',
  FILE: 'file',
  TEXT: 'text',
  APPLET: 'applet',
};
// 编辑弹窗文字
export const TYPE_MODAL_TITLE = {
  [TYPE_CODE.IMAGE]: '编辑图片',
  [TYPE_CODE.AUDIO]: '编辑音频',
  [TYPE_CODE.VIDEO]: '编辑视频',
  [TYPE_CODE.LINK]: '编辑链接',
  [TYPE_CODE.FILE]: '编辑文件',
  [TYPE_CODE.TEXT]: '编辑文本',
  [TYPE_CODE.APPLET]: '编辑小程序',
};
export const TYPE_NUM = {
  [TYPE_CODE.IMAGE]: 1,
  [TYPE_CODE.AUDIO]: 2,
  [TYPE_CODE.VIDEO]: 3,
  [TYPE_CODE.LINK]: 4,
  [TYPE_CODE.FILE]: 5,
  [TYPE_CODE.TEXT]: 6,
  [TYPE_CODE.APPLET]: 7,
};
export const TYPE_NAME = {
  [TYPE_CODE.IMAGE]: '图片',
  [TYPE_CODE.AUDIO]: '音频',
  [TYPE_CODE.VIDEO]: '视频',
  [TYPE_CODE.LINK]: '链接',
  [TYPE_CODE.FILE]: '文件',
  [TYPE_CODE.TEXT]: '文本',
  [TYPE_CODE.APPLET]: '小程序',
};

export const FILE_TYPE = [
  // {
  //   label: TYPE_NAME[TYPE_CODE.TEXT],
  //   value: TYPE_NUM[TYPE_CODE.TEXT],
  //   isLeaf: false,
  // },
  {
    label: TYPE_NAME[TYPE_CODE.IMAGE],
    value: TYPE_NUM[TYPE_CODE.IMAGE],
    isLeaf: false,
  },
  {
    label: TYPE_NAME[TYPE_CODE.VIDEO],
    value: TYPE_NUM[TYPE_CODE.VIDEO],
    isLeaf: false,
  },
  {
    label: TYPE_NAME[TYPE_CODE.FILE],
    value: TYPE_NUM[TYPE_CODE.FILE],
    isLeaf: false,
  },
  {
    label: TYPE_NAME[TYPE_CODE.LINK],
    value: TYPE_NUM[TYPE_CODE.LINK],
    isLeaf: false,
  },
  // {
  //   label: TYPE_NAME[TYPE_CODE.APPLET],
  //   value: TYPE_NUM[TYPE_CODE.APPLET],
  //   isLeaf: false,
  // },
];
//短信发送状态
export const SMS_STATUS_CODE = {
  NONE: 0,
  UNSEND: 1,
  SUCCESS: 2,
  FAILED: 3,
};

// 统计类型 报表还是明细

export const STATISTICS_CODE = {
  REPORT: 1,
  DETAIL: 2,
};
export const STATISTICS_NAME = {
  [STATISTICS_CODE.REPORT]: '报表',
  [STATISTICS_CODE.DETAIL]: '明细',
};

export const TABS_CODE = {
  DATA: 1,
  MATERIAL: 2,
  STAFF: 3,
  HOT_WORDS: 4,
};
export const TABS_NAME = {
  [TABS_CODE.DATA]: '数据统计',
  [TABS_CODE.MATERIAL]: '素材排行',
  [TABS_CODE.STAFF]: '员工排行',
  [TABS_CODE.HOT_WORDS]: '热搜热词',
};

export const STATISTICS = {
  TOTAL: 1, // 素材总统计
  CHANNERL: 2, // 素材渠道统计
};
