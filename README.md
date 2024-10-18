# dexco

## 注入wallet sdk
打开 wallet sdk
https://github.com/the-web3/wallet-sdk

install dependencies
```
 pnpm install
```
更新 SDK 到最新版本
```
 pnpm run update-sdk
```
build
```
npm run build 
```
copy dist/wallet 文件夹 到 本项目 src/wallet 
copy dist/secret 文件夹 到 本项目 src/secret

## 启动
install dependencies
```
npm install
```
本地开发 启动
```
npm run dev 
```

正式环境启动
preview
```
npm run build 
npm run preview 
```
## 流程test
目前遵循之前的规范， 在 APP.vue 中写入测试代码
查看参数 导入对应的私钥到钱包中 地址一致即可


## git 