// 保存二进制
export const saveBlob = (blob, fileName) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  // onload当读取操作成功完成时调用
  reader.onload = (e) => {
    let a = document.createElement('a');
    // 获取文件名fileName
    a.download = fileName;
    a.href = e.target.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
};

// 判断是否为jsonBlob
export const isJsonBlob = (blob) => {
  if (!(blob instanceof Blob)) {
    return false;
  }

  if (blob.type == 'application/json') {
    return true;
  }
  return false;
};

/**
 * json二进制转为json
 * @param {*} blob
 * @returns {Promise<Boolean|Object>} 返回的json，如果失败，返回false
 */
export const jsonBlob2Json = (blob) => {
  return new Promise((resolve, reject) => {
    if (!isJsonBlob(blob)) {
      reject(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsText(blob, 'utf-8');
    reader.onload = function () {
      const { result } = reader;
      const parseObj = JSON.parse(result);
      resolve(parseObj);
    };
  });
};
