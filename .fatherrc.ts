export default {
  // more father 4 config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    ignores: ['**/*/demos/'],
    transformer: 'swc',
  },
  cjs: {
    ignores: ['**/*/demos/'],
    transformer: 'swc',
  },
  umd: {
    externals: {
      antd: 'antd',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    // ignores: ['demos/'],
  },
  // extraBabelPlugins: [
  //   [
  //     '@babel/plugin-transform-runtime',
  //     {
  //       corejs: 3,
  //       version: '^7.15.3',
  //     },
  //   ],
  // ],
};
