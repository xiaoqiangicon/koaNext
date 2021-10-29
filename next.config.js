// 因为Nextjs不支持css，所以要引入插件支持

const withCss = require('@zeit/next-css');
const config = require('./config');

const configs = {
  // 编译文件的输出目录
  distDir: 'dist',
  // 是否给每个路由生成Etag
  generateEtags: true,
  // 页面内容缓存配置
  onDemandEntries: {
    // 内容在内存中缓存的时长(ms)
    maxInactiveAge: 25 * 1000,
    // 同事缓存多少个页面
    pagesBuggerLength: 2,
  },
  // 在pages目录下那种后缀的文件会被认为是页面
  pageExtensions: ['jsx', 'js'],
  // 配置buildId
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID
    }

    // 返回Null使用默认的unique_id
    return null
  },
  // 手动修改webpack config
  webpack(config, options) {
    return config
  },
  // 修改webpackDevMiddleware配置
  webpackDevMiddleware: config => {
    return config
  },
  // 可以在页面上通过process.env.customKey 获取 value
  env: {
    customKey: 'value',
  },
  // 下面两个要通过 'next/config'来读取
  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mysecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },
  // 在服务端和客户端都可获取的配置
  publicRuntimeConfig: {
    staticFolder: '/static',
  }
}

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

module.exports = withCss({
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${config.github.client_id}&scope=${SCOPE}`
  }
});