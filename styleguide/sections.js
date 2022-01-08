/**
 * 分组设置
 * https://react-styleguidist.js.org/docs/components#sections
 */
module.exports = [
  {
    name: '组件开发',
    content: 'docs/GetStarted.md',
  },
  {
    name: '布局',
    components: 'src/components/layouts/**/**.vue',
  },
  {
    name: '基础',
    components: 'src/components/!(pro|layouts)/**/Dt**.vue',
    sectionDepth: 1,
  },
  {
    name: '业务',
    content: 'docs/pro.md',
    components: 'src/components/pro/**/Dt**.vue',
    sectionDepth: 1,
  },
  {
    name: '指令',
    content: 'docs/directives.md',
    sectionDepth: 1,
    sections: [
      {
        name: 'v-copy',
        content: 'docs/directives/v-copy.md',
      },
      {
        name: 'v-download',
        content: 'docs/directives/v-download.md',
      },
    ],
  },
];
