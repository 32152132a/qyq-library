const path = require('path');

// 文档实例的环境
const globalRequiresPath = path.join(__dirname, './global.requires.js');
const sections = require('./sections');
const pkg = require('../package.json');

/**
 * 完整配置见React-Styleguist
 * @link https://react-styleguidist.js.org/docs/configuration
 */
module.exports = {
  title: 'SMP-UI PC组件库',
  version: pkg.version,
  // Vue运行环境
  require: [globalRequiresPath],
  // 改动后预览的延迟
  previewDelay: 300,
  // devServer端口号
  serverPort: 1314,
  // 打包结果的目录
  styleguideDir: 'docs-dist',
  // assetsDir: 'doc',
  // styleguidePublicPath: '/doc',
  // 复制按钮
  copyCodeButton: true,
  // 展示mixins/inject
  displayOrigins: true,
  // index.html文件定制
  template: {
    favicon: 'https://smp-app-test.iyouke.com/favicon.ico',
  },
  usageMode: 'expand',
  pagePerSection: true,
  // 目录配置
  sections,
  theme: './styleguide/theme.js',
  styles: './styleguide/styles.js',
  // vue组件预览组件，注入store
  renderRootJsx: path.join(__dirname, './styleguide.root.js'),
};
