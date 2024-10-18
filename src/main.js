import { createApp } from 'vue'
import App from './App.vue'
import Bridge from './dsbridge.js'
// import WalletFunctions from '@wallet-sdk/wallet';
import { Buffer } from 'buffer';
import process from 'process'
// import crypto from 'crypto-browserify';
window.Buffer = Buffer;
window.process = process

const app = createApp(App)

// 全局属性替代 Vue.prototype
app.config.globalProperties.$bridge = Bridge

// 全局属性替代 Vue.Buffer
app.config.globalProperties.$Buffer = Buffer

// app.config.globalProperties.$wallet = WalletFunctions;

// 如果需要 crypto，取消注释下面的行
// app.config.globalProperties.$crypto = crypto

app.mount('#app')
