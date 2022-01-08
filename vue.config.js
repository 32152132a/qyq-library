const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  productionSourceMap: false,
  filenameHashing: true,
  lintOnSave: false,
  pages: {
    index: {
      // page 的入口
      entry: "src/index.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
    },
  },
  configureWebpack: (config) => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000,
      };
    }
    config.resolve.alias["@"] = resolve("src");
    // config.resolve = {
    //   alias: {
    //     '@': resolve('src'),
    //   },
    // }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#5671FF',
            'link-color': '#5671FF',
            'border-radius-base': '2px',
            'background-color': '#f5f5f5',
            'alert-info-border-color': '#bac6ff',
            'alert-info-bg-color': '#ecefff',
            'alert-info-icon-color': '#5671FF',
            'modal-header-bg': 'transparent',
            'modal-footer-bg': 'transparent',
          },
          javascriptEnabled: true,
        },
      },
    },
  }
};
