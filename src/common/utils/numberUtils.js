// 数字转千分位并补0
export const toThousands = (num) => {
  // 非数字转为0
  if (!num) {
    num = 0;
  }
  num = num.toString().split('.');
  var znum = (num[0] || 0).toString(),
    result = '';
  while (znum.length > 3) {
    result = ',' + znum.slice(-3) + result;
    znum = znum.slice(0, znum.length - 3);
  }
  if (znum) {
    result = znum + result;
  }

  let fnum = num[1];
  if (fnum) {
    if (fnum.length == 1) {
      fnum = fnum + '0';
    }
  } else {
    fnum = '00';
  }
  return result + '.' + fnum;
};

// 千分位逗号分隔不带小数点
// 数字转千分位并补0
export const toThousandsNoPoint = (num) => {
  // 非数字转为0
  if (!num) {
    num = 0;
  }
  var znum = num.toString(),
    result = '';
  while (znum.length > 3) {
    result = ',' + znum.slice(-3) + result;
    znum = znum.slice(0, znum.length - 3);
  }
  if (znum) {
    result = znum + result;
  }
  return result;
};
