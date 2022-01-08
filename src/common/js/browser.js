// 拷贝到粘贴板
export const copyToClipboard = (string) => {
  const input = document.createElement('input'); // 直接构建input
  input.value = string; // 设置内容
  document.body.appendChild(input); // 添加临时实例
  input.select(); // 选择实例内容
  document.execCommand('Copy'); // 执行复制
  document.body.removeChild(input); // 删除临时实例
};

// 参考 https://github.com/Grewer/downloadByUrl/blob/master/src/index.ts
const _userAgent = navigator.userAgent.toLowerCase();
const isChrome = _userAgent.indexOf('chrome') > -1;
const isSafari = _userAgent.indexOf('safari') > -1;
const isFireFox = _userAgent.indexOf('firefox') > -1;

/**
 * 下载文件
 * @param {String} url 文件远程地址，必填 url可能会有跨域问题导致文件名应用不上 如有跨域问题用downloadFileCors方法下载
 * @param {String} fileName 文件名，可以不带后缀，由url自动推测
 * @param {String} target a标签的target属性，默认为_self
 * @return {Boolean} 是否已触发下载
 */
export const downloadFile = function (url, fileName, target = '_self') {
  if (/(iP)/g.test(navigator.userAgent)) {
    return false;
  }

  if (isChrome || isSafari || isFireFox) {
    const link = document.createElement('a');
    link.href = url;
    link.target = target;
    if (link.download !== undefined) {
      link.download =
        fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  if (url.indexOf('?') === -1) {
    url += '?download';
  }

  window.open(url, target);
  return true;
};

/**
 * 下载文件
 * @param {String} url 文件远程地址，必填
 * @param {String} fileName
 * @param {String} target a标签的target属性，默认为_self
 * @return {Boolean} 是否已触发下载
 *
 */
export const downloadFileCors = (url, fileName, target = '_self') => {
  var x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = function () {
    //会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    var url = window.URL.createObjectURL(x.response);
    var a = document.createElement('a');
    a.href = url;
    a.target = target;
    a.download =
      fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
    a.click();
  };
  x.send();
};
// 下载图片，通过canvas方式
export const downloadImage = (url, fileName) => {
  //下载图片地址和图片名
  let image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    // TODO: 增加各种类型图片的支持
    let base64 = canvas.toDataURL('image/png'); //得到图片的base64编码数据
    downloadFile(base64, fileName);
  };
  image.src = url + '?t=' + Date.now();
};

// 滚动到顶部
export const scrollToTop = (el, animation = true) => {
  let scrollTop = el.scrollTop;
  if (scrollTop > 0) {
    if (!animation) {
      el.scrollTo(0, 0);
    }
    window.requestAnimationFrame(scrollToTop.bind(this, el));
    if (scrollTop < 10) {
      el.scrollTo(0, 0);
    } else {
      el.scrollTo(0, scrollTop - scrollTop / 8);
    }
  }
};
