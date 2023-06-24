"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailText = exports.web_Url = exports.vnp_Url = exports.vnp_TmnCode = exports.vnp_HashSecret = exports.NEW_PASSWORD_IS_DIFFERENT_FROM_OLD = exports.NEW_PASSWORD_IS_DIFFERENT_FROM_OLD_MESSAGE = exports.WEAK_PASSWORD_ERROR_MESSAGE = exports.WEAK_PASSWORD_STATUS_CODE = exports.MAX_PASSWORD_LENGTH = exports.MIN_PASSWORD_LENGTH = void 0;
exports.MIN_PASSWORD_LENGTH = 8;
exports.MAX_PASSWORD_LENGTH = 100;
exports.WEAK_PASSWORD_STATUS_CODE = 422;
exports.WEAK_PASSWORD_ERROR_MESSAGE = `Password must be ${exports.MIN_PASSWORD_LENGTH}-${exports.MAX_PASSWORD_LENGTH} characters long, must contain both upper and lowercase letters and 2 digit!`;
exports.NEW_PASSWORD_IS_DIFFERENT_FROM_OLD_MESSAGE = 'The new password must be different from the old password';
exports.NEW_PASSWORD_IS_DIFFERENT_FROM_OLD = 'NEW_PASSWORD_IS_DIFFERENT_FROM_OLD';
exports.vnp_HashSecret = "TGFARZKFBTSJAQHNENLUFOLEVBLVKJOP";
exports.vnp_TmnCode = "VV2XA67I";
exports.vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
exports.web_Url = "http://localhost:3001/";
var EmailText;
(function (EmailText) {
    EmailText["RESET_PASSWORD_TITLE"] = "Plan de Transport - R\u00E9initialisation Mot de passe";
})(EmailText = exports.EmailText || (exports.EmailText = {}));
//# sourceMappingURL=constants.js.map