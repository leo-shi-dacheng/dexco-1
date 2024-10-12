"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// exports.PrivateKeyToAddress = exports.SignTransaction = exports.CreateAddress = exports.ValidateMnemonic = exports.MnemonicToSeed = exports.DecodeMnemonic = exports.EncodeMnemonic = exports.CreateMnemonic = exports.AesDecrypt = exports.AesEncrypt = void 0;
// const btc_1 = require("./btc");
// const eth_1 = require("./eth");
// const trx_1 = require("./trx");
// const ton_1 = require("./ton");
// const sol_1 = require("./sol");
// const eos_1 = require("./eos");
const sui_1 = require("./sui");

const secret_1 = require("../secret");
const bip_1 = require("./bip/bip");
// const BitcoinSeries = ['Bitcoin', 'Litecoin', 'BitcoinCash'];
// const EthereumSeries = ['Ethereum', 'Linea', 'Scroll', 'EthereumClassic', 'BscChain', 'Heco', 'Polygon', 'AvaxC', 'Arbitrum', 'Base', 'Optimism', 'Zksync', 'Metis', 'Boba'];
// const TrxSeries = ['Trx'];

// const SolanaSeries = ['Sol'];
// const CosmosSeries = ['Atom', 'Scrt', 'Bnb'];
// const EosSeries = ['Eos', 'Waxp'];
// const bip39 = require("bip39") ;
// const TonSeries = ['Ton'];
const SuiSeries = ['Sui'];

//
// var http = require('http');
// var leftPad = require('left-pad');
// const express = require('express');
// const bodyParser = require('body-parser');
//
// const app = express();
// var server = require('http').createServer(app);
//
// app.use(bodyParser.json());
//
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
//
// var PORT = process.env.PORT || 2024;
// server.listen(PORT);
// console.log('Server running.');
// app.post('/validateMnemonic', function (req, res) {
//     console.log("post validateMnemonic");
//     console.log(req.body);
//     const { mnemonic } = req.body;
//     console.log("mnemonic =");
//     console.log(mnemonic);
//
//     var returnDic = {resultStr: 'get request success'};
//     res.contentType('json');//返回的数据类型
//     const params = {
//               mnemonic: mnemonic,
//               language: "english"
//           }
//     const isValid = ValidateMnemonic(params);
//     res.send(JSON.stringify(isValid));//给客户端返回一个json格式的数据
// });
// app.post('/privateKeyToAddress', function (req, res) {
//     console.log("post PrivateKeyToAddress");
//     console.log(req.body);
//
//     const { privateKey, chain } = req.body;
//
//     console.log("privateKey =");
//     console.log(privateKey);
//     console.log("chain =");
//     console.log(chain);
//
//     var returnDic = {resultStr: 'get request success'};
//     res.contentType('json');//返回的数据类型
//     if (BitcoinSeries.includes(chain)) {
//
//         const params = {
//             privateKey: privateKey,
//             network: "mainnet"
//         }
//         const account = PrivateKeyToAddress(chain,params)
//         console.log(account);
//         res.send(JSON.stringify(account));
//     }else {
//         const account = PrivateKeyToAddress(chain,privateKey)
//         console.log(account);
//         res.send(JSON.stringify(account));
//     }
//
// });

// app.get('/createMnemonic', function (req, res) {
//     console.log("Get method");
//     console.log(req.query);
//     var returnDic = {resultStr: 'get request success'};
//     res.contentType('json');//返回的数据类型
//     const params = {
//     number: 12,
//     language: "english"
//     }
//     const mnemonic = CreateMnemonic(params);
//     res.send(JSON.stringify(mnemonic));//给客户端返回一个json格式的数据
// });
//
// app.post('/creatAddress',function (req, res) {
//     console.log("post creatAddress");
//     const { mnemonic, chain } = req.body;
//     console.log(mnemonic);
//     console.log(chain);
//     const params_1 = {
//     mnemonic: mnemonic,
//     password: ""
//     }
//     const seed = MnemonicToSeed(params_1)
//
//     const param = {
//     seedHex: seed.toString("hex"),
//     chain: chain,
//     index: "0",
//     receiveOrChange: "0",
//     network:"mainnet"
//
//     }
//
//     const account = CreateAddress(param)
//     res.send(JSON.stringify(account));
// });
//
// app.post('/signTransactionBitcoin', function (req, res) {
//     const {
//         inputs,
//         outputs,
//         privateKey
//     } = req.body;
//
//     console.log("post signTransactionBitcoin");
//     console.log(req.body);
//
//     if (!inputs || !outputs) {
//         res.status(400).send({ error: "Invalid request, inputs or outputs missing" });
//         return;
//     }
//
//     const data = {
//         inputs: inputs.map(input => ({
//             address: input.address,
//             txid: input.txid,
//             amount: parseInt(input.amount, 10),
//             vout: parseInt(input.vout, 10),
//         })),
//         outputs: outputs.map(output => ({
//             amount: parseInt(output.amount, 10),
//             address: output.address,
//         })),
//     };
//
//     console.log(data);
//
//     const signParams = {
//         privateKey: privateKey,
//         signObj: data,
//         network: "mainnet"
//     };
//
//     try {
//         const signedTransaction = SignTransaction("Bitcoin",signParams);
//
//         res.send(JSON.stringify({ signedTransaction: signedTransaction }));
//     } catch (error) {
//         console.error("SignTransaction failed:", error);
//         res.status(500).send({ error: "SignTransaction failed", details: error.message });
//     }
// });
//
// app.post('/signTransactionEthereum', function (req, res) {
//     console.log("post signTransaction");
//     const {
//         privateKey,
//         nonce,
//         fromAd,
//         toAd,
//         gasLimit,
//         amount,
//         gasPrice,
//         decimal,
//         chainId,
//         tokenAddress
//     } = req.body;
//     console.log(req.body);
//     console.log(nonce);
//
//     const params = {
//     privateKey: privateKey,
//     nonce: parseInt(nonce, 10), // Convert nonce to integer
//         from: fromAd,
//     to: toAd,
//     gasLimit: parseInt(gasLimit, 10), // Ensure gasLimit is also an integer
//     amount: amount,
//     gasPrice: parseInt(gasPrice,10), // Ensure gasPrice is also an integer
//     decimal: parseInt(decimal, 10), // Ensure decimal is also an integer
//     chainId: parseInt(chainId, 10), // Ensure chainId is also an integer
//     tokenAddress: tokenAddress
//     };
//     console.log(params);
//
//     SignTransaction("Ethereum", params)
//         .then(data1 => {
//             res.contentType('json'); // 返回的数据类型
//             res.send(JSON.stringify({ signedTransaction: data1 }));
//         })
//         .catch(error => {
//             console.error('Error signing transaction:', error);
//             res.status(500).send({ error: 'Failed to sign transaction' });
//         });
// });
//var versions_server = http.createServer( (request, response) => {
////    const params = {
////    number: 12,
////    language: "english"
////    }
////    const mnemonic = CreateMnemonic(params);
//
//
//    //    response.end('Versions: ' + JSON.stringify(mnemonic) + ' left-pad: ' + leftPad(42, 5, '0'));
//
////---------------------createAddress
////    const mnemonic = "lounge face pattern cinnamon shrug average spend rapid field cheese wrist weather";
////    const params_1 = {
////        mnemonic: mnemonic,
////        password: ""
////    }
////    const seed = MnemonicToSeed(params_1)
////
////    const param = {
////    seedHex: seed.toString("hex"),
////    chain: "Bitcoin",
////    index: "0",
////    receiveOrChange: "0",
////    network:"mainnet"
////
////    }
////    console.log("This way can not support")
////
////    const account = CreateAddress(param)
////
////    response.end('Versions: ' + JSON.stringify(account) + ' left-pad: ' + leftPad(42, 5, '0'));
//    //---------------------createAddress  Ethereum
//
////    const mnemonic = "lounge face pattern cinnamon shrug average spend rapid field cheese wrist weather";
////    const params_1 = {
////    mnemonic: mnemonic,
////    password: ""
////    }
////    const seed = MnemonicToSeed(params_1)
////    console.log(seed);
////    const param = {
////    seedHex: seed.toString("hex"),
////    chain: "Ethereum",
////    index: "0",
////    receiveOrChange: "0",
////    network:"mainnet"
////
////    }
////    const account = CreateAddress(param)
////    response.end('Versions: ' + JSON.stringify(account) + ' left-pad: ' + leftPad(42, 5, '0'));
//  //--------------------------SignTransaction
////    const data = {
////        inputs: [
////            {
////                address: "1H1oAqmdfTNECrrHFAJ4AhbTUyPcQjrf72",
////                txid: "209706b97a9aed047df158bf57cfbdad94a5e9bd9ac5261034448ec4590bab8f",
////                amount: 9000000000000000,
////                vout: 0,
////            },
////        ],
////        outputs: [
////            {
////                amount: 9000000000000000,
////                address: "1H1oAqmdfTNECrrHFAJ4AhbTUyPcQjrf72",
////            },
////        ],
////    };
//
////    const rawHex = SignTransaction("Bitcoin",{
////        privateKey: "60164bec9512d004af7f71e7ed868c8e9ac2cc6234d8b682037ec80547595f2e",
////        signObj: data,
////        network: "mainnet"
////    })
////    console.log(rawHex);
////    response.end('Versions: ' + JSON.stringify(rawHex) + ' left-pad: ' + leftPad(42, 5, '0'));
//
//
////    const rawHex = SignTransaction("Ethereum",{
////        "privateKey": "face51db89f3cc83dbbef750d335df3ee2e47f96941bd98566b65406da4075bf",
////        "nonce": 12,
////        "from": "0x64BAa15C01346f6469EfA312198a8E015651b4df",
////        "to": "0x36FCde42B307915a94542132AbE5b273bFfF4376",
////        "gasLimit": 21000,
////        "amount": "0.000000001",
////        "gasPrice": 7500000,
////        "decimal": 18,
////        "chainId": 1,
////        "tokenAddress": "0x00"
////    }).then(data1=>{
////
////        response.end('Versions: ' + JSON.stringify(data1) + ' left-pad: ' + leftPad(42, 5, '0'));
////
////    })
//
//})  ;
//versions_server.listen(3000);

/*
 *  Aes 加密函数
 */
function AesEncrypt(value, key) {
    return (0, secret_1.Encrypt)(value, key);
}
exports.AesEncrypt = AesEncrypt;
/*
 *  Aes 解密函数
 */
function AesDecrypt(value, key) {
    return (0, secret_1.Decrypt)(value, key);
}
exports.AesDecrypt = AesDecrypt;
/*
 * 生成助记词
 */
function CreateMnemonic(params) {
    return (0, bip_1.generateMnemonic)(params);
}
exports.CreateMnemonic = CreateMnemonic;
/*
 * 助记词序列化
 */
function EncodeMnemonic(params) {
    return (0, bip_1.encodeMnemonic)(params);
}
exports.EncodeMnemonic = EncodeMnemonic;
/*
 * 助记词反序列化
 */
function DecodeMnemonic(params) {
    return (0, bip_1.decodeMnemonic)(params);
}
exports.DecodeMnemonic = DecodeMnemonic;
/*
 * 助记词生成种子
 */
function MnemonicToSeed(params) {
    return (0, bip_1.mnemonicToSeed)(params);
}
exports.MnemonicToSeed = MnemonicToSeed;
/*
 * 验证助记词
 */
function ValidateMnemonic(params) {
    return (0, bip_1.validateMnemonic)(params);
}
exports.ValidateMnemonic = ValidateMnemonic;
/*
 * 生成地址函数
 * @seedHex: 助记词的 seedHex
 * @chain: 链名称
 * @index: 地址索引
 * @receiveOrChange: BTC 是否生成找零地址
 * @network: btc 生成不同格式的地址参数
 */
function CreateAddress(params) {
    const { seedHex, chain, index, receiveOrChange, network } = params;
    // bitcoin 系列币种
    // if (BitcoinSeries.includes(chain)) {
    //     return (0, btc_1.createBtcAddress)(seedHex, receiveOrChange, index, network);
    // }

    // eth 系列币种
    // if (EthereumSeries.includes(chain)) {
    //     return (0, eth_1.createEthAddress)(seedHex, index);
    // }

    // eos 系列币种
    // if (EosSeries.includes(chain)) {
    //     return (0, eos_1.createEosAddress)(seedHex, index);
    // }

    // cosmos 生态币种
    // if (CosmosSeries.includes(chain)) {
    //     throw new Error("Don't support this chain");
    // }
    
    // solana 系列币种
    // if (SolanaSeries.includes(chain)) {
    //    return (0, sol_1.createSolAddress)(seedHex, index);
    // }

    // SuiSeries
    if (SuiSeries.includes(chain)) {
       return (0, sui_1.createSuiAddress)(seedHex, index);
    }

    // Ton 系列币种
    // if (TonSeries.includes(chain)) {
    //     return (0, ton_1.createTonAddress)(seedHex, index);
    // }

    // trx 系列币种
    // if (TrxSeries.includes(chain)) {
    //     return (0, trx_1.createTrxAddress)(seedHex, index);
    // }
}
exports.CreateAddress = CreateAddress;
/*
 *  签名函数
 *  @params: 签名需要传入的参数
 */
function SignTransaction(chain, params) {
    // console.log(`chain ${chain}`);
    // console.log(`params ${params.toString()}`);
    // bitcoin 系列币种
    // if (BitcoinSeries.includes(chain)) {
    //     return (0, btc_1.signBtcTransaction)(params);
    // }
    // eth 系列币种
    // if (EthereumSeries.includes(chain)) {
    //     return (0, eth_1.signEthTransaction)(params);
    // }
    // eos 系列币种
    // if (EosSeries.includes(chain)) {
    //     return (0, eos_1.signEosTransaction)(params);
    // }
    // cosmos 生态币种
    // if (CosmosSeries.includes(chain)) {
    //     throw new Error("Don't support this chain");
    // }
    // solana 系列币种
   // if (SolanaSeries.includes(chain)) {
   //     return (0, sol_1.signSolTransaction)(params);
   // }
       

    // Ton
    // if (TonSeries.includes(chain)) {
    //  return (0, ton_1.SignTransaction)(params);
    // }

    // trx 系列币种
    // if (TrxSeries.includes(chain)) {
    //     return (0, trx_1.signTrxTransaction)(params);
    // }
}
exports.SignTransaction = SignTransaction;

function PrivateKeyToAddress(chain, params) {
    // bitcoin 系列币种
    // if (BitcoinSeries.includes(chain)) {
    //     return (0, btc_1.importBtcAddress)(params);
    // }
    // eth 系列币种
    // if (EthereumSeries.includes(chain)) {
    //     return (0, eth_1.importEthAddress)(params);
    // }
    
    // Ton
    // if (TonSeries.includes(chain)) {
    //    return (0, ton_1.importTonAddress)(params);
    // }

    // solana 系列币种
    // if (SolanaSeries.includes(chain)) {
    //     return (0, sol_1.importSolAddress)(params);
    // }


    // cosmos 生态币种
    // if (CosmosSeries.includes(chain)) {
    //     throw new Error("Don't support this chain");
    // }
    // eos 系列币种
    // if (EosSeries.includes(chain)) {
    //     throw new Error("Don't support this chain");
    // }
    // trx 系列币种
    if (TrxSeries.includes(chain)) {
        return (0, trx_1.importTrxAddress)(params);
    }
}
exports.PrivateKeyToAddress = PrivateKeyToAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi93YWxsZXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStFO0FBQy9FLCtCQUErRTtBQUMvRSwrQkFBK0U7QUFDL0UsK0JBQTZEO0FBQzdELCtCQUErRTtBQUUvRSxzQ0FBNkM7QUFDN0MsbUNBQStHO0FBRS9HLE1BQU0sYUFBYSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUM3RCxNQUFNLGNBQWMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzdLLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM3QyxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsQyxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdCLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFMUI7O0dBRUc7QUFDSCxTQUFnQixVQUFVLENBQUUsS0FBSyxFQUFFLEdBQUc7SUFDcEMsT0FBTyxJQUFBLGdCQUFPLEVBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFGRCxnQ0FFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFFLEtBQUssRUFBRSxHQUFHO0lBQ3BDLE9BQU8sSUFBQSxnQkFBTyxFQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRkQsZ0NBRUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLGNBQWMsQ0FB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
