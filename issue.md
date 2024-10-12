## 未知包
"@ravendevkit/node-x16r": "1.0.2",
"@ravendevkit/ravencore-lib": "1.0.6",
这两个包是做什么的

## 编译问题
项目需要编译成几种环境
- 浏览器环境
- node 环境
- 安卓和ios webview 
- reactNative 环境

这个配置将生成三种格式的输出：ES 模块、CommonJS 和 UMD。UMD 格式可以在多种环境中使用，包括浏览器和 React Native。

### reactNative 环境适配
对于 React Native 环境，您可能需要在 metro.config.js 中添加一些配置来处理 ES 模块

module.exports = {
  resolver: {
    sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
  },
};

