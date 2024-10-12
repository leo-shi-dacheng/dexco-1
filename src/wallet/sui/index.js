"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importSuiAddress = exports.verifySuiAddress = exports.signSuiTransaction = exports.createSuiAddress = void 0;
const blake2b_1 = require("@noble/hashes/blake2b");
const sui_js_1 = require("@mysten/sui.js");
const BigNumber = require('bignumber.js');
function createSuiAddress(mnemonic, receiveOrChange, addresIndex, network) {
    const keyPair = sui_js_1.Ed25519Keypair.deriveKeypair(mnemonic, `m/44'/784'/0'/0'/${addresIndex}'`);
    return {
        privateKey: Buffer.from((0, sui_js_1.fromB64)(keyPair.export().privateKey)).toString('hex'),
        publicKey: Buffer.from(keyPair.getPublicKey().toBytes()).toString('hex'),
        address: keyPair.getPublicKey().toSuiAddress()
    };
}
exports.createSuiAddress = createSuiAddress;
const getTxBytes = (coinRefs, outputs, decimal, sender, gasBudget, gasPrice, gasCoins) => __awaiter(void 0, void 0, void 0, function* () {
    const tx = new sui_js_1.TransactionBlock();
    if (Array.isArray(gasCoins) && gasCoins.length > 0) {
        tx.setGasPayment(gasCoins);
    }
    else {
        tx.setGasPayment(coinRefs);
    }
    tx.setGasBudget(gasBudget);
    tx.setGasOwner(sender);
    tx.setGasPrice(gasPrice);
    tx.setSender(sender);
    const pureAmounts = outputs.map(({ amount }) => {
        const calcAmount = new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString();
        if (calcAmount.indexOf('.') !== -1)
            throw new Error('decimal 无效');
        return tx.pure(calcAmount);
    });
    const newCoins = tx.splitCoins(tx.gas, pureAmounts);
    // eslint-disable-next-line array-callback-return
    outputs.map(({ to }, index) => {
        tx.transferObjects([newCoins[index]], tx.pure(to));
    });
    return yield tx.build();
});
const getSignature = (txBytes, keypair, schemeByte) => {
    const dataToSign = new Uint8Array(3 + txBytes.length);
    dataToSign.set([0, 0, 0]);
    dataToSign.set(txBytes, 3);
    const digest = (0, blake2b_1.blake2b)(dataToSign, { dkLen: 32 });
    const rawSignature = keypair.signData(digest);
    const pubKey = keypair.getPublicKey().toBytes();
    const signature = new Uint8Array(1 + rawSignature.length + pubKey.length);
    signature.set([schemeByte]);
    signature.set(rawSignature, 1);
    signature.set(pubKey, 1 + rawSignature.length);
    return signature;
};
function signSuiTransaction(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { signObj: { from, decimal, coinRefs, gasBudget, gasPrice, outputs, gasCoins }, privateKey } = params;
        const privkey = new Uint8Array(Buffer.from(privateKey, 'hex'));
        const keypair = sui_js_1.Ed25519Keypair.fromSecretKey(privkey);
        const txBytes = yield getTxBytes(coinRefs, outputs, decimal, from, gasBudget, gasPrice, gasCoins);
        const signature = getSignature(txBytes, keypair, 0);
        return JSON.stringify([
            (0, sui_js_1.toB64)(txBytes),
            (0, sui_js_1.toB64)(signature)
        ]);
    });
}
exports.signSuiTransaction = signSuiTransaction;
function verifySuiAddress(params) {
    const { address } = params;
    // eslint-disable-next-line prefer-regex-literals
    const regex = new RegExp('^0x[0-9a-fA-F]{64}$');
    if (!regex.test(address))
        return false;
    return true;
}
exports.verifySuiAddress = verifySuiAddress;
function importSuiAddress(params) {
    const { privateKey } = params;
    const keyPair = sui_js_1.Ed25519Keypair.fromSecretKey(Uint8Array.from(Buffer.from(privateKey, 'hex')));
    return keyPair.getPublicKey().toSuiAddress();
}
exports.importSuiAddress = importSuiAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi93YWxsZXQvc3VpL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFnRDtBQUNoRCwyQ0FBa0Y7QUFDbEYsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBYzFDLFNBQWdCLGdCQUFnQixDQUFFLFFBQWdCLEVBQUUsZUFBdUIsRUFBRSxXQUFtQixFQUFFLE9BQWU7SUFDL0csTUFBTSxPQUFPLEdBQUcsdUJBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQzNGLE9BQU87UUFDTCxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFBLGdCQUFPLEVBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM3RSxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3hFLE9BQU8sRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsWUFBWSxFQUFFO0tBQy9DLENBQUM7QUFDSixDQUFDO0FBUEQsNENBT0M7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUNqQixRQUFxQixFQUNyQixPQUFvQixFQUNwQixPQUFlLEVBQ2YsTUFBYyxFQUNkLFNBQWlCLEVBQ2pCLFFBQWdCLEVBQ2hCLFFBQXFCLEVBQ3JCLEVBQUU7SUFDRixNQUFNLEVBQUUsR0FBRyxJQUFJLHlCQUFnQixFQUFFLENBQUM7SUFDbEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2xELEVBQUUsQ0FBQyxhQUFhLENB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