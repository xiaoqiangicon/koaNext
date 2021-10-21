// 因为Nextjs不支持css，所以要引入插件支持

const withCss = require('@zeit/next-css');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

module.exports = withCss({});