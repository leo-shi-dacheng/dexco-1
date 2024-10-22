<template>
  <div id="app"></div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Erc20ABI } from '@/assets/abi/Erc20ABI';
import { FuturesMarginPool } from '@/assets/abi/FuturesMarginPool';

import {
  CreateMnemonic,
  CreateAddress,
  MnemonicToSeed,
  PrivateKeyToAddress,
  SignTransaction,
  ValidateMnemonic
} from '@wallet-sdk';

// import "@babel/polyfill";

const BitcoinSeries = ['Bitcoin', 'Litecoin', 'BitcoinCash'];

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      message: 'Waiting for response...',
      provider: null,
      web3: null,
      contract: null,
      address: '',
      chainId: null,
    });
    // Uncomment if needed:
    // const state = reactive({
    //   provider: null,
    //   web3: null,
    //   contract: null,
    // });

    const methods = {
      postMessage(data) {
        try {
          // eslint-disable-next-line no-undef
          connectState.postMessage(JSON.stringify(data));
        } catch (e) {
          // console.log(e)
        }
      },

      async getConnectStatus() {
        const walletconnect = window.localStorage.getItem('walletconnect');
        if (walletconnect) {
          const connectJson = JSON.parse(walletconnect);
          if (connectJson.connected) {
            methods.connectWallet();
          }
        }
      },

      bindFunction() {
        window.setPage = methods.setPage;
        window.connectWallet = methods.connectWallet;
        window.getWalletBalace = methods.getWalletBalace;
        window.sign = methods.sign;
        window.deposit = methods.deposit;
        window.disconnect = methods.disconnect;
        window.createMnemonic = methods.createMnemonic;
      },

      createMnemonic() {
        const params = {
          number: 12,
          language: "english"
        }
        try {
          const mnemonic = CreateMnemonic(params);
          return JSON.stringify({
            data: mnemonic,
            iserror: false,
            msg: ""
          });
        } catch (e) {
          return JSON.stringify({
            data: null,
            iserror: true,
            msg: e
          });
        }
      },

      creatAddress(mnemonic, chain, fromMnemonic = false) {
        const params_1 = {
          mnemonic: mnemonic,
          password: ""
        }
        const seed = MnemonicToSeed(params_1)

        const param = {
          seedHex: seed.toString("hex"),
          chain: chain,
          index: "0",
          receiveOrChange: "0",
          network: "mainnet"
        }
        try {
          const account = CreateAddress(param)
      
          return JSON.stringify({
            data: account,
            iserror: false,
            msg: ""
          });
        } catch (e) {
          return JSON.stringify({
            data: null,
            iserror: true,
            msg: e
          });
        }
      },

      validateMnemonic(mnemonic) {
        const params = {
          mnemonic: mnemonic,
          language: "english"
        }
        try {
          const isValid = ValidateMnemonic(params);
          return JSON.stringify({
            data: isValid,
            iserror: false,
            msg: ""
          });
        } catch (e) {
          return JSON.stringify({
            data: null,
            iserror: true,
            msg: e
          });
        }
      },

      MnemonicToSeed(mnemonic) {
        const params_1 = {
           mnemonic: mnemonic,
           password: ""
        }

        const seed = MnemonicToSeed(params_1)
        const param = {
          seedHex: seed.toString("hex"),
          chain: "Bitcoin",
          index: "0",
          receiveOrChange: "0",
          network:"mainnet"
        }
        try {
          const account = CreateAddress(param)
          return JSON.stringify({
            data: account,
            iserror: false,
            msg: ""
          });
        } catch (e) {
          return JSON.stringify({
            data: null,
            iserror: true,
            msg: e
          });
        }
      },

      privateKeyToAddress(privateKey, chain) {
        if (BitcoinSeries.includes(chain)) {
          const params = {
            privateKey: privateKey,
            network: "mainnet"
          }
          try {
            const account = PrivateKeyToAddress(chain, params)
            console.log(account);
            return JSON.stringify({
              data: account,
              iserror: false,
              msg: ""
            });
          } catch (e) {
            return JSON.stringify({
              data: null,
              iserror: true,
              msg: e
            });
          }
        } else {
          try {
            const account = PrivateKeyToAddress(chain, privateKey)
            return JSON.stringify({
              data: account,
              iserror: false,
              msg: ""
            });
          } catch (e) {
            return JSON.stringify({
              data: null,
              iserror: true,
              msg: e
            });
          }
        }
      },

      async signTransaction(chainName, params) {
        try {
          let data1 = await SignTransaction(chainName, params);
          window.$bridge.callmethod('signTransaction', JSON.stringify({
            data: data1,
            iserror: false,
            msg: ""
          }));
        } catch (error) {
          window.$bridge.callmethod('signTransaction', JSON.stringify({
            data: null,
            iserror: true,
            msg: error.message || error
          }));
        }
      },

      async signTransactionEthereum(privateKey, nonce, fromAd, toAd, gasLimit, amount, gasPrice, decimal, chainId, tokenAddress) {
        const params = {
          privateKey: privateKey,
          nonce: parseInt(nonce, 10),
          from: fromAd,
          to: toAd,
          gasLimit: parseInt(gasLimit, 10),
          amount: amount,
          gasPrice: parseInt(gasPrice, 10),
          decimal: parseInt(decimal, 10),
          chainId: parseInt(chainId, 10),
          tokenAddress: tokenAddress
        };
        try {
          let data1 = await SignTransaction("Ethereum", params);
          console.log('After awaiting SignTransaction');
          console.log(`data1 ${data1}`);
          window.$bridge.callmethod('signTransactionEthereum', JSON.stringify({
            data: data1,
            iserror: false,
            msg: ""
          }))
        } catch (e) {
          window.$bridge.callmethod('signTransactionEthereum', JSON.stringify({
            data: null,
            iserror: true,
            msg: e
          }))
        }
      },

      async signTransactionBitcoin(inputs, outputs, privateKey) {
        if (!inputs || !outputs) {
          return {error: "Invalid request, inputs or outputs missing"};
        }
        console.log("old"+privateKey)
        if (privateKey.startsWith("0x")) {
          privateKey = privateKey.slice(2);
        }
        if(privateKey.length==52){
          privateKey = methods.wifTohex(privateKey);
        }
        console.log("new"+privateKey)
        const data = {
          inputs: inputs.map(input => ({
            address: input.address,
            txid: input.txid,
            amount: parseInt(input.amount, 10),
            vout: parseInt(input.vout, 10),
          })),
          outputs: outputs.map(output => ({
            amount: parseInt(output.amount, 10),
            address: output.address,
          })),
        };

        const signParams = {
          privateKey: privateKey,
          signObj: data,
          network: 'mainnet'
        };

        const signedTransaction = await SignTransaction("Bitcoin", signParams);
        window.$bridge.callmethod('signTransactionBitcoin', JSON.stringify({
          data: signedTransaction,
          iserror: false,
          msg: ""
        }))
      },

      bindEvents() {
        state.provider.on('accountsChanged', (accounts) => {
          if (accounts.length) {
            if (accounts[0] !== state.address) {
              methods.getWalletInfo();
            }
          }
        });

        state.provider.on('chainChanged', (chainId) => {
          const chainIdNum = state.web3.utils.hexToNumber(chainId);
          if (chainIdNum !== state.chainId) {
            methods.getWalletInfo();
          }
        });

        state.provider.on('disconnect', () => {
          methods.postMessage({
            code: -1,
            data: null,
          });
        });
      },

      setPage(title, logo) {
        document.title = title;
        const link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = logo;
        document.getElementsByTagName('head')[0].appendChild(link);
      },

      async connectWallet() {
        try {
          const web3Modal = new Web3Modal({
            network: '',
            cacheProvider: true,
            providerOptions: {
              injected: {
                display: {
                  name: 'MetaMask',
                  description: '连接钱包',
                },
              },
              walletconnect: {
                package: WalletConnectProvider,
                options: {
                  infuraId: '48c1b5f07c7444478cf268b47df23512',
                  rpc: {
                    56: 'https://bsc-dataseed.binance.org',
                    137: 'https://rpc.ankr.com/polygon',
                    80001: 'https://matic-mumbai.chainstacklabs.com',
                  },
                },
              },
            },
            mobileWallets: [
              {
                id: "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
                name: "bitkeep",
                links: {
                  native: "bitkeep://",
                  universal: "chainupdex://",
                },
              },
            ],
            walletImages: {
              bitkeep: "/images/bitkeep.webp",
            },
            defaultChain: 'polygon'
          });
          state.provider = await web3Modal.connect();
          await state.provider.enable();
          state.web3 = new Web3(state.provider);
          methods.bindEvents();
          methods.getWalletInfo();
        } catch (e) {
          methods.postMessage({
            code: 400,
            error: e,
          });
        }
      },

      async getWalletInfo() {
        try {
          const accounts = await state.web3.eth.getAccounts();
          [state.address] = accounts;
          state.chainId = await state.web3.eth.getChainId();
          methods.postMessage({
            code: 2,
            data: {
              chainId: state.chainId,
              address: state.address,
            },
          });
        } catch (e) {
          methods.postMessage({
            code: 400,
            error: e,
          });
        }
      },

      disconnect() {
        state.provider.disconnect();
      },

      async getWalletBalace(token) {
        try {
          let balance = 0;
          const contract = new state.web3.eth.Contract(Erc20ABI, token);
          const decimals = await contract.methods.decimals().call();
          const res = await contract.methods.balanceOf(state.address).call({from: state.address});
          if (Number(res) !== 0) {
            balance = res / (10 ** decimals);
          }
          methods.postMessage({
            code: 3,
            data: balance,
          });
        } catch (e) {
          methods.postMessage({
            code: 400,
            error: e,
          });
        }
      },

      async sign(companyId) {
        try {
          const chainIdHex = state.web3.utils.toHex(state.chainId).replace('0x', '').padStart(64, '0');
          const companyIdHex = state.web3.utils.toHex(companyId).replace('0x', '').padStart(64, '0');
          const addressHex = state.address.replace('0x', '').padStart(64, '0');
          const info = `0xaf3067cecdd428dab67b65fe3e0abb5ab731f2a7ad725daf7ca5791e0f693e32${chainIdHex}${companyIdHex}${addressHex}70476298be4a08e9feb87508662fa44d0dbe18806f809cb0fe7fe3f8915529fb`;
          const message = state.web3.utils.sha3(info.toLowerCase()).replace('0x', '');
          const signData = state.web3.utils.sha3(`0x1901${message}`);
          const res = await state.web3.eth.personal.sign(signData, state.address, '');
          if (res) {
            methods.postMessage({
              code: 4,
              data: res,
            });
          } else {
            methods.postMessage({
              code: 400,
              error: '',
            });
          }
        } catch (e) {
          methods.postMessage({
            code: 400,
            error: e,
          });
        }
      },

      async deposit(amount, token, poolAddress, recordHash) {
        try {
          state.contract = new state.web3.eth.Contract(Erc20ABI, token);
          const allowBalance = await state.contract.methods.allowance(state.address, poolAddress).call();
          const decimals = await state.contract.methods.decimals().call();
          const balanceAmount = allowBalance / (10 ** decimals);
          if (balanceAmount && Number(balanceAmount) >= Number(amount)) {
            methods.confirmDeposit(amount, poolAddress, recordHash);
          } else {
            const number = state.web3.utils.toWei('100000000000000000000000000', 'ether');
            const approveRes = await state.contract.methods.approve(poolAddress, number).send({from: state.address});
            if (approveRes) {
              methods.confirmDeposit(amount, poolAddress, recordHash);
            } else {
              methods.postMessage({
                code: 400,
                error: '',
              });
            }
          }
        } catch (e) {
          methods.postMessage({
            code: 400,
            error: e,
          });
        }
      },

      async confirmDeposit(amount, poolAddress, recordHash) {
        try {
          const poolContract = new state.web3.eth.Contract(FuturesMarginPool, poolAddress);
          const decimals = await state.contract.methods.decimals().call();
          const num = methods.toNumberStr(amount * (10 ** decimals));
          const res = await poolContract.methods.deposit(num, recordHash).send({from: state.address});
          if (res) {
            methods.postMessage({
              code: 5,
              data: res.transactionHash,
            });
          } else {
            methods.postMessage({
              code: 400,
              error: '',
            });
          }
        } catch (e) {
          methods.postMessage({
            code: 400,
            error: e,
          });
        }
      },

      toNumberStr(val) {
        const numStr = val.toFixed(0).toString();
        if (numStr.indexOf('e') > -1) {
          const [num, index] = numStr.split('e+');
          const float = num.indexOf('.') > -1 ? num.split('.')[1].length : 0;
          const intStr = (num * (10 ** float)).toFixed(0).toString();
          return intStr.padEnd(Number(index) + 1, '0');
        }
        return numStr;
      },

      wifTohex(wif) {
        // Implement WIF to hex conversion if needed
        // This is a placeholder and should be replaced with actual implementation
        return wif;
      },
    };

    onMounted(() => {
      methods.bindFunction();
      methods.getConnectStatus();

      const bridge = window.$bridge;
      if (bridge) {
        bridge.registermethod('createMnemonic', methods.createMnemonic);
        bridge.registermethod('creatAddress', methods.creatAddress);
        bridge.registermethod('validateMnemonic', methods.validateMnemonic);
        bridge.registermethod('privateKeyToAddress', methods.privateKeyToAddress);
        bridge.registermethod('MnemonicToSeed', methods.MnemonicToSeed);
        bridge.registerAsynmethod('signTransactionEthereum', methods.signTransactionEthereum);
        bridge.registerAsynmethod('signTransactionBitcoin', methods.signTransactionBitcoin);
        bridge.registerAsynmethod('signTransaction', methods.signTransaction);
      }

      // Uncomment and adapt as needed:
      var s = methods.creatAddress("huge legal bean believe general level wrong sorry spare shift bamboo mesh","Sui")
      console.log(s, 'sui creatAddress')

      var tonAddress = methods.creatAddress("huge legal bean believe general level wrong sorry spare shift bamboo mesh","Ton")
      console.log(tonAddress, 'tonAddress')

      var btcAddress = methods.creatAddress("huge legal bean believe general level wrong sorry spare shift bamboo mesh","Bitcoin")
      console.log(btcAddress, 'btcAddress')

      var ethAddress = methods.creatAddress("huge legal bean believe general level wrong sorry spare shift bamboo mesh","Ethereum")
      console.log(ethAddress, 'ethAddress')

      var solAddress = methods.creatAddress("huge legal bean believe general level wrong sorry spare shift bamboo mesh","Sol")
      console.log(solAddress, 'solAddress')


      var trxAddress = methods.creatAddress("huge legal bean believe general level wrong sorry spare shift bamboo mesh","Trx")
      console.log(trxAddress, 'trxAddress')

      // var s1 = methods.privateKeyToAddress( 
      //   "714d230f6ef89d869888008803535c59881285bb5e7346b1c8141ac6610fd65f8d41e9451d2c8d92e7730e86ed9b0fc32a8396e549cd638626328fc2431354a4",
      //   "Ton"
      // )
      // console.log(s1)

      // const param = {
      //   from: "UQAUAHcUab66DpOV2GaT_QDuSagpMdIn0x6aMmO3_fPVM305",
      //   to: "EQCQCLTvR0XYTyM0uxh_H8kLAR7u7v98pEKZKpbq8w2peuNY",
      //   memo: "memo",
      //   amount: 0.01,
      //   sequence: 38103804,
      //   decimal: 10,
      //   privateKey: "b0e4eb37bc5929491899d2a50f52f0a4613d3a48e56245267fdecff392ead89b7e4fdf79bf78566b85b73787e5739ab4306350d7ad1adc50be9c57fe2102bfcc"
      // }

      // var params = {
      //     "privateKey": "f73a86bb5b097b4e6a24e8f137e648cd8168c478747c1ca4ad584396719fe683",
      //     "from": "TCsgPuLixdiG8Vmyko4aSUxFMkjRdNtqhG",
      //     "to": "TTmBGdD3yjse4iJd7EJtvxNJGaQbzheMSu",
      //     "amount": "1000",
      //     "energyPrice": 280,
      //     "energyLimit": 21000,
      //     "tokenAddress": "",
      //     "refBlock": {
      //         "blockHash": "0000000003ee1f51d72ee021053989ffd26d79eada0d1625b801f0df54dafcab",
      //         "blockNumHex": "3ee1f51"
      //     }
      // }
      // methods.signTransaction('Trx', params)

      // var s = methods.privateKeyToAddress( 
      //   "f73a86bb5b097b4e6a24e8f137e648cd8168c478747c1ca4ad584396719fe683",
      //   "Trx"
      // )
      // console.log(s)

      // var s = methods.creatAddress("huge legal bean believe general level wrong sorry spare shift bamboo mesh","Ethereum")
      // console.log(s)

      // var s = methods.creatAddress("lounge face pattern cinnamon shrug average spend rapid field cheese wrist weather", 'Bitcoin')
      // console.log(s)

      // var s = methods.privateKeyToAddress( 
      //   "L4zUUavirdKMotgKxQYq7ZvPLFs9tYmjst7kHVVvfh7Gnp5Jp1FR",
      //   "Bitcoin"
      // )
      // console.log(s)

      // methods.signTransactionBitcoin([
      //       {
      //         address: '1HBs4iAUCJUqJewL4AojBNEJUCPG2jz788',
      //         txid: '081c46c272eb2e83c38982a8bc4e30def44d80e08da1949167d58f459440f07a',
      //         amount: 1554,
      //         vout: 1
      //       },
      //       {
      //         address: '1HBs4iAUCJUqJewL4AojBNEJUCPG2jz788',
      //         txid: 'e8d9c63d8ef81d7d68aeea30f7e913d12178d1725172ae164353557a0631f320',
      //         amount: 4936,
      //         vout: 0
      //       },
      //       {
      //         address: '1HBs4iAUCJUqJewL4AojBNEJUCPG2jz788',
      //         txid: '0f7e2b742dd315a0ce477fd536470e5f755a221c0a3786d30e4d16371f1b69b2',
      //         amount: 546,
      //         vout: 0
      //       }
      //     ],
      //     [
      //       { amount: '2', address: '1PCHJxT6YFXxjqNc588iDbLFqiy2Jp5nCU' },
      //       {
      //         amount: '6.264E-5',
      //         address: '1HBs4iAUCJUqJewL4AojBNEJUCPG2jz788'
      //       }
      //     ],
      //     "L24CdWewFqH2emVFwToqL4ZLxpcUPR4Vu6Wsc5no8WWYuL3jtNNv")
    });

    return {
      ...toRefs(state),
      ...methods,
    };
  },
});
</script>

<style>
body {
  background: rgba(0, 0, 0, 0) !important;
}

#app {
  width: 0;
  height: 0;
  opacity: 0;
}

.walletconnect-qrcode__base {
  background: rgba(0, 0, 0, 0) !important;
}
</style>