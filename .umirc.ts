import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'create-antd-modal',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/create-antd-modal/',
  publicPath: '/create-antd-modal/',
  ignoreMomentLocale: true,
  mfsu: {},
  devServer: {
    host: '127.0.0.1',
    port: 3122,
  },
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: true,
    },
  },
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/bowencool/create-antd-modal',
    },
  ],
  // more config: https://d.umijs.org/config
});
