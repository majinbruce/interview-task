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
exports.performSwapAsync = void 0;
var axios_1 = require("axios");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var misc_1 = require("./misc");
var contract_addresses_1 = require("@0x/contract-addresses");
var utils_1 = require("@0x/utils");
var zeroExDeployedPlygonAddresses = (0, contract_addresses_1.getContractAddressesForChainOrThrow)(contract_addresses_1.ChainId.PolygonMumbai);
function introToERC20TokenContract(web3Provider) {
    return __awaiter(this, void 0, void 0, function () {
        var tokenAddress, tokenContract, name, decimals, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tokenAddress = "0x48178164eB4769BB919414Adc980b659a634703E";
                    tokenContract = new misc_1.ERC20TokenContract(tokenAddress, web3Provider);
                    return [4 /*yield*/, tokenContract.name().callAsync()];
                case 1:
                    name = _a.sent();
                    return [4 /*yield*/, tokenContract.decimals().callAsync()];
                case 2:
                    decimals = _a.sent();
                    return [4 /*yield*/, tokenContract.balanceOf("0xSomeAddress").callAsync()];
                case 3:
                    balance = _a.sent();
                    console.log(name); // DAI
                    console.log(decimals); // 18
                    console.log(balance); // 100000000000000000000
                    // Writing a value on the blockchain
                    return [4 /*yield*/, tokenContract
                            .transfer("0xSomeOtherAddress", new utils_1.BigNumber(100000000000000000000))
                            .awaitTransactionSuccessAsync({
                            from: "0xMyAddress"
                        })];
                case 4:
                    // Writing a value on the blockchain
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Converts a humanly-readable number (that may contain decimals, example: 133.232) into a big integer.
 * Why do we need this: Ethereum can only only store integer values, so, in order to generate a number
 * that can be diplayed to users (in a UI), you need to store that number as a big integer + the number of
 * decimal places.
 *
 * Example:
 * (USDC has 6 decimals, DAI has 18 decimals)
 *
 * - convertValueFromHumanToEthereum(usdcToken, 5) returns 5000000
 * - convertValueFromHumanToEthereum(daiToken, 20.5) returns 20500000000000000000
 *
 * @param tokenWrapper an instance of the ERC20 token wrapper
 * @param unitAmount a number representing the human-readable number
 * @returns a big integer that can be used to interact with Ethereum
 */
function convertValueFromHumanToEthereum(tokenWrapper, unitAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var decimals;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, tokenWrapper.decimals().callAsync()];
                case 1:
                    decimals = _a.sent();
                    return [2 /*return*/, web3_wrapper_1.Web3Wrapper.toBaseUnitAmount(unitAmount, decimals.toNumber())];
            }
        });
    });
}
/**
 * Performs a trade by requesting a quote from the 0x API, and filling that quote on the blockchain
 * @param buyToken the token address to buy
 * @param sellToken the token address to sell
 * @param amountToSellUnitAmount the token amount to sell
 * @param fromAddress the address that will perform the transaction
 * @param client the Web3Wrapper client
 */
function performSwapAsync(buyTokenWrapper, sellTokenWrapper, amountToSellUnitAmount, fromAddress, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var amountToSellInBaseUnits, sellTokenBalance, zeroExERC20Allowance, url, params, httpResponse, jsonResponse, txData, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, convertValueFromHumanToEthereum(sellTokenWrapper, amountToSellUnitAmount)];
                case 1:
                    amountToSellInBaseUnits = _a.sent();
                    return [4 /*yield*/, sellTokenWrapper
                            .balanceOf(fromAddress)
                            .callAsync()];
                case 2:
                    sellTokenBalance = _a.sent();
                    if (amountToSellInBaseUnits > sellTokenBalance) {
                        throw new Error("Insufficient sellTokenBalance ");
                    }
                    return [4 /*yield*/, sellTokenWrapper
                            .allowance(fromAddress, zeroExDeployedPlygonAddresses.erc20BridgeProxy)
                            .callAsync()];
                case 3:
                    zeroExERC20Allowance = _a.sent();
                    if (!(zeroExERC20Allowance < amountToSellInBaseUnits)) return [3 /*break*/, 5];
                    console.log("approving 0x proxy contract for ".concat(amountToSellInBaseUnits, " amount of tokens"));
                    return [4 /*yield*/, sellTokenWrapper
                            .approve(zeroExDeployedPlygonAddresses.erc20BridgeProxy, amountToSellInBaseUnits)
                            .awaitTransactionSuccessAsync({
                            from: fromAddress,
                            gas: 800000,
                            gasPrice: 20e9
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    url = "https://mumbai.api.0x.org//swap/v0/quote";
                    params = {
                        buyToken: buyTokenWrapper.address,
                        sellToken: sellTokenWrapper.address,
                        sellAmount: amountToSellUnitAmount.toString(),
                        takerAddress: fromAddress
                    };
                    return [4 /*yield*/, axios_1["default"].get(url, { params: params })];
                case 6:
                    httpResponse = _a.sent();
                    jsonResponse = httpResponse.data;
                    console.log("".concat(jsonResponse, " JSON response received from API "));
                    txData = {
                        from: httpResponse.data.from,
                        to: httpResponse.data.to,
                        data: httpResponse.data.data,
                        gas: httpResponse.data.gas,
                        gasPrice: httpResponse.data.gasPrice,
                        value: httpResponse.data.value
                    };
                    console.log("Ethereum transaction generated by the 0x API: ".concat(txData));
                    console.log("Orders used to perform the swap ".concat(httpResponse.data.orders));
                    client = new web3_wrapper_1.Web3Wrapper(provider);
                    return [4 /*yield*/, client.sendTransactionAsync(txData)];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.performSwapAsync = performSwapAsync;
