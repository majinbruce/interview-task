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
exports.__esModule = true;
require("bootstrap/dist/css/bootstrap.min.css");
require("./style.css");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var subproviders_1 = require("@0x/subproviders");
var misc_1 = require("./misc");
var exercise_1 = require("./exercise");
var contract_addresses_1 = require("@0x/contract-addresses");
document.addEventListener("DOMContentLoaded", function () { return __awaiter(void 0, void 0, void 0, function () {
    var scopedWindow, account, providerEngine, client, provider, chainId, daiToken, usdcToken, daiDecimals, usdcDecimals, zeroExDeployedPlygonAddresses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scopedWindow = window;
                if (scopedWindow.ethereum === undefined) {
                    throw new Error('Web3 not defined, please install and unlock Metamask');
                }
                return [4 /*yield*/, scopedWindow.ethereum.enable()];
            case 1:
                account = (_a.sent())[0];
                scopedWindow.ethereum.on('accountsChanged', function () { return location.reload(); });
                if (scopedWindow.web3 === undefined) {
                    throw new Error('Web3 not defined, please install and unlock Metamask');
                }
                providerEngine = new subproviders_1.Web3ProviderEngine();
                providerEngine.addProvider(new subproviders_1.MetamaskSubprovider(scopedWindow.web3.currentProvider));
                providerEngine.addProvider(new subproviders_1.RPCSubprovider(misc_1.INFURA_RPC_URL));
                providerEngine.start();
                client = new web3_wrapper_1.Web3Wrapper(providerEngine);
                provider = client.getProvider();
                return [4 /*yield*/, client.getChainIdAsync()];
            case 2:
                chainId = _a.sent();
                if (chainId !== 80001) {
                    throw new Error("Chain ID should be set to Kovan, it was set to ".concat(chainId));
                }
                daiToken = new misc_1.ERC20TokenContract(misc_1.FAKE_DAI, provider);
                usdcToken = new misc_1.ERC20TokenContract(misc_1.FAKE_USDC, provider);
                return [4 /*yield*/, daiToken.decimals().callAsync()];
            case 3:
                daiDecimals = _a.sent();
                return [4 /*yield*/, usdcToken.decimals().callAsync()];
            case 4:
                usdcDecimals = _a.sent();
                (0, misc_1.linkBtnToCallback)("mintDAI", function () { return (0, misc_1.mintTokens)(account, misc_1.FAKE_DAI, provider, misc_1.DEFAULT_MINT_AMOUNT); });
                (0, misc_1.linkBtnToCallback)("mintUSDC", function () { return (0, misc_1.mintTokens)(account, misc_1.FAKE_USDC, provider, misc_1.DEFAULT_MINT_AMOUNT); });
                (0, misc_1.linkBtnToCallback)("swapDaiForUsdc", function () { return (0, exercise_1.performSwapAsync)(usdcToken, daiToken, 100, account, provider); });
                (0, misc_1.linkBtnToCallback)("swapUsdcForDai", function () { return (0, exercise_1.performSwapAsync)(daiToken, usdcToken, 100, account, provider); });
                zeroExDeployedPlygonAddresses = (0, contract_addresses_1.getContractAddressesForChainOrThrow)(contract_addresses_1.ChainId.PolygonMumbai);
                setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var daiBalance, usdcBalance, daiAllowance, usdcAllowance, usdcAllowanceText, daiAllowanceText;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, daiToken.balanceOf(account).callAsync()];
                            case 1:
                                daiBalance = _a.sent();
                                return [4 /*yield*/, usdcToken.balanceOf(account).callAsync()];
                            case 2:
                                usdcBalance = _a.sent();
                                return [4 /*yield*/, daiToken.allowance(account, zeroExDeployedPlygonAddresses.erc20BridgeProxy).callAsync()];
                            case 3:
                                daiAllowance = _a.sent();
                                return [4 /*yield*/, usdcToken.allowance(account, zeroExDeployedPlygonAddresses.erc20BridgeProxy).callAsync()];
                            case 4:
                                usdcAllowance = _a.sent();
                                usdcAllowanceText = web3_wrapper_1.Web3Wrapper.toUnitAmount(usdcAllowance, usdcDecimals.toNumber()).decimalPlaces(2);
                                daiAllowanceText = web3_wrapper_1.Web3Wrapper.toUnitAmount(daiAllowance, daiDecimals.toNumber()).decimalPlaces(2);
                                ;
                                (0, misc_1.setTextOnDOMElement)('fakeDaiBalance', web3_wrapper_1.Web3Wrapper.toUnitAmount(daiBalance, daiDecimals.toNumber()).decimalPlaces(2).toString());
                                (0, misc_1.setTextOnDOMElement)('fakeUsdcBalance', web3_wrapper_1.Web3Wrapper.toUnitAmount(usdcBalance, usdcDecimals.toNumber()).decimalPlaces(2).toString());
                                (0, misc_1.setTextOnDOMElement)('fakeDaiAllowance', daiAllowanceText.toString());
                                (0, misc_1.setTextOnDOMElement)('fakeUsdcAllowance', usdcAllowanceText.toString());
                                return [2 /*return*/];
                        }
                    });
                }); }, 2000);
                return [2 /*return*/];
        }
    });
}); });
