## rvn包 暂时去掉了 需要再加到 package.json 中
"@ravendevkit/node-x16r": "1.0.2",
"@ravendevkit/ravencore-lib": "1.0.6",
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
传参数的时候注意 
receiveOrChange 和 addresIndex

sui 自己基于 ed25519-hd-key 封装了Ed25519Keypair
Ed25519Keypair 生成地址方法
  - deriveKeypairFromSeed 入参是 seedHex
    seedHex -> address
  - deriveKeypair 入参 是 mnemonic
    mnemonic -> seedHex -> address

sui 私钥地址有4 5种格式
不同钱包 需要不同的编码格式

https://github.com/sui-foundation/sips/blob/main/sips/sip-15.md