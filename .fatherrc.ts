export default {
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  esm: {
    ignores: ['**/*/demos/'],
  },
  cjs: {
    ignores: ['**/*/demos/'],
  },
  umd: {
    externals: {
      antd: 'antd',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    // ignores: ['demos/'],
  },
  extraBabelPlugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        version: '^7.15.3',
      },
    ],
  ],
};
