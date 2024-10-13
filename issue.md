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

### node 环境 注入
需要将node 中很多原生包注入

### reactNative 环境适配
暂时不需要


### sui的问题
其他链都是 mnemonic -> seedHex -> address
sui 是 mnemonic -> address

传参数的时候注意 
receiveOrChange 和 addresIndex