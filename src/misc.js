"use strict";
// ⚠️ This file contains a lot of misc functions/interfaces/helper functions that have been made to reduce
// some of the complexity of Ethereum.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
exports.__esModule = true;
exports.mintTokens = exports.setTextOnDOMElement = exports.linkBtnToCallback = exports.MAP_TOKEN_TO_NAME = exports.INFURA_RPC_URL = exports.KOVAN_0x_API = exports.DEFAULT_GAS_PRICE = exports.ZERO = exports.IN_A_YEAR = exports.INFINITE_ALLOWANCE = exports.DEFAULT_MINT_AMOUNT = exports.FAKE_USDC = exports.FAKE_DAI = exports.ERC20TokenContract = void 0;
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var contracts_erc20_1 = require("@0x/contracts-erc20");
// Hack! The `ERC20TokenContract` in "@0x/contracts-erc20" does not have `decimals()`, so I am using
// an internal contract that is called `DummyERC20TokenContract` instead.
var contracts_erc20_2 = require("@0x/contracts-erc20");
__createBinding(exports, contracts_erc20_2, "DummyERC20TokenContract", "ERC20TokenContract");
// Attention! This tutorial will be using 2 dummy ERC20 token contracts
// that I deployed on the Kovan testnet. These are not the real DAI and
// USDC, but they are drop-in replacements.
// These fake token contracts are your standard ERC20 token contracts, but they have a
// special `mint(amount)` function that allows you to create new tokens at any time.
// 
exports.FAKE_DAI = '0x48178164eB4769BB919414Adc980b659a634703E';
exports.FAKE_USDC = '0x5a719Cf3E02c17c876F6d294aDb5CB7C6eB47e2F';
exports.DEFAULT_MINT_AMOUNT = new utils_1.BigNumber(1000);
exports.INFINITE_ALLOWANCE = new utils_1.BigNumber(2).pow(256).minus(1);
exports.IN_A_YEAR = new utils_1.BigNumber(1616731441);
exports.ZERO = new utils_1.BigNumber(0);
exports.DEFAULT_GAS_PRICE = new utils_1.BigNumber(5000000000);
exports.KOVAN_0x_API = 'https://mumbai.api.0x.org/';
exports.INFURA_RPC_URL = 'https://polygon-mumbai.g.alchemy.com/v2/CLvWWXx7trlsqai_uu4ldpptx65HFY3y';
exports.MAP_TOKEN_TO_NAME = (_a = {},
    _a[exports.FAKE_DAI] = 'DAI',
    _a[exports.FAKE_USDC] = 'DAI',
    _a);
/**
 * Links the `onclick` event of a button denoted by ID to a callback
 * @param buttonId the button ID as a string, must be unique
 * @param callback a JS function callback that is triggered with the button is pressed
 */
function linkBtnToCallback(buttonId, callback) {
    var button = document.getElementById(buttonId);
    if (button === null) {
        throw new Error("Button ".concat(buttonId, " was not found"));
    }
    button.onclick = callback;
}
exports.linkBtnToCallback = linkBtnToCallback;
/**
 * A simple utility to set text on to a ID
 * @param buttonId the button ID as a string, must be unique
 * @param text a string to set
 */
function setTextOnDOMElement(buttonId, text) {
    var button = document.getElementById(buttonId);
    if (button === null) {
        throw new Error("Button ".concat(buttonId, " was not found"));
    }
    button.innerText = text;
}
exports.setTextOnDOMElement = setTextOnDOMElement;
/**
 * A simple utility that can be used to mint tokens. The dummy ERC20Token contract exposes a special
 * `mint()` function that can be used to create tokens out of thin air!
 *
 * @param fromAddress the address receiving the tokens
 * @param tokenAddress the address of the ERC20 token
 * @param provider the Web3 provider
 * @param mintAmount the amount to mint, this can be a maximum of 10,000
 */
function mintTokens(fromAddress, tokenAddress, provider, mintAmount) {
    if (mintAmount === void 0) { mintAmount = exports.DEFAULT_MINT_AMOUNT; }
    return __awaiter(this, void 0, void 0, function () {
        var contractInstance, numDecimals, mintAmountInBaseUnits, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractInstance = new contracts_erc20_1.DummyERC20TokenContract(tokenAddress, provider);
                    return [4 /*yield*/, contractInstance.decimals().callAsync()];
                case 1:
                    numDecimals = _a.sent();
                    mintAmountInBaseUnits = web3_wrapper_1.Web3Wrapper.toBaseUnitAmount(mintAmount, numDecimals.toNumber());
                    return [4 /*yield*/, contractInstance.mint(mintAmountInBaseUnits).awaitTransactionSuccessAsync({
                            from: fromAddress
                        })];
                case 2:
                    tx = _a.sent();
                    return [2 /*return*/, tx.transactionHash];
            }
        });
    });
}
exports.mintTokens = mintTokens;
