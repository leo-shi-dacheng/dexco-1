"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMnemonic = exports.mnemonicToEntropy = exports.mnemonicToSeed = exports.decodeMnemonic = exports.encodeMnemonic = exports.generateMnemonic = void 0;
const bip39 = require('bip39');
function generateMnemonic(params) {
    const { number, language } = params;
    if (!number && !language)
        throw new Error('Must have language and language');
    switch (language) {
        case 'chinese_simplified':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.chinese_simplified);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.chinese_simplified);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.chinese_simplified);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.chinese_simplified);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.chinese_simplified);
            }
            else {
                throw new Error("Don't support this number");
            }
        case 'chinese_traditional':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.chinese_traditional);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.chinese_traditional);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.chinese_traditional);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.chinese_traditional);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.chinese_traditional);
            }
            else {
                throw new Error("Don't support this number");
            }
        case 'english':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.english);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.english);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.english);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.english);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.english);
            }
            else {
                throw new Error("Don't support this number");
            }
        case 'french':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.french);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.french);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.french);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.french);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.french);
            }
            else {
                throw new Error("Don't support this number");
            }
        case 'italian':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.italian);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.italian);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.italian);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.italian);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.italian);
            }
            else {
                throw new Error("Don't support this number");
            }
        case 'japanese':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.japanese);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.japanese);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.japanese);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.japanese);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.japanese);
            }
            else {
                throw new Error("Don't support this number");
            }
        case 'korean':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.korean);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.korean);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.korean);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.korean);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.korean);
            }
            else {
                throw new Error("Don't support this number");
            }
        case 'spanish':
            if (number === 12) {
                return bip39.generateMnemonic(128, null, bip39.wordlists.spanish);
            }
            else if (number === 15) {
                return bip39.generateMnemonic(160, null, bip39.wordlists.spanish);
            }
            else if (number === 18) {
                return bip39.generateMnemonic(192, null, bip39.wordlists.spanish);
            }
            else if (number === 21) {
                return bip39.generateMnemonic(224, null, bip39.wordlists.spanish);
            }
            else if (number === 24) {
                return bip39.generateMnemonic(256, null, bip39.wordlists.spanish);
            }
            else {
                throw new Error("Don't support this number");
            }
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}
exports.generateMnemonic = generateMnemonic;
function encodeMnemonic(params) {
    const { mnemonic, language } = params;
    if (!mnemonic && !language)
        throw new Error('Must have mnemonic and language');
    switch (language) {
        case 'chinese_simplified':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.spanish);
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}
exports.encodeMnemonic = encodeMnemonic;
function decodeMnemonic(params) {
    const { encrytMnemonic, language } = params;
    if (!encrytMnemonic && !language)
        throw new Error('Must have mnemonic and language');
    switch (language) {
        case 'chinese_simplified':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.spanish);
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}
exports.decodeMnemonic = decodeMnemonic;
function mnemonicToSeed(params) {
    const { mnemonic, password } = params;
    if (!mnemonic)
        throw new Error('Must have mnemonic');
    return bip39.mnemonicToSeedSync(mnemonic, password);
}
exports.mnemonicToSeed = mnemonicToSeed;
function mnemonicToEntropy(params) {
    const { mnemonic, password } = params;
    if (!mnemonic)
        throw new Error('Must have mnemonic');
    return bip39.mnemonicToEntropy(mnemonic, password);
}
exports.mnemonicToEntropy = mnemonicToEntropy;
function validateMnemonic(params) {
    const { mnemonic, language } = params;
    if (!mnemonic && !language)
        throw new Error('Must have mnemonic and language');
    switch (language) {
        case 'chinese_simplified':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.spanish);
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}
exports.validateMnemonic = validateMnemonic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vd2FsbGV0L2JpcC9iaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRS9CLFNBQWdCLGdCQUFnQixDQUFFLE1BQU07SUFDdEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFDcEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVE7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDN0UsUUFBUSxRQUFRLEVBQUU7UUFDaEIsS0FBSyxvQkFBb0I7WUFDdkIsSUFBSSxNQUFNLEtBQUssRUFBRSxFQUFFO2dCQUNqQixPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUM5RTtpQkFBTSxJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUU7Z0JBQ3hCLE9BQU8sS0FBSyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQzlFO2lCQUFNLElBQUksTUFBTSxLQUFLLEVBQUUsRUFBRTtnQkFDeEIsT0FBTyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDOUU7aUJBQU0sSUFBSSxNQUFNLEtBQUssRUFBRSxFQUFFO2dCQUN4QixPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUM5RTtpQkFBTSxJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUU7Z0JB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QyxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxLQUFLLFNBQVM7WUFDWixPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRSxLQUFLLFVBQVU7WUFDYixPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxLQUFLLFFBQVE7WUFDWCxPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxLQUFLLFNBQVM7WUFDWixPQUFPLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRTtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztLQUMxRTtBQUNILENBQUM7QUF2QkQsNENBdUJDIn0=