"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../helpers/error");
const native_sql_1 = require("../helpers/native-sql");
const constants_1 = require("../helpers/constants");
const PasswordValidatorHelper_1 = require("../helpers/PasswordValidatorHelper");
const reset_password_1 = require("../helpers/mail/reset-password");
module.exports = function (Account) {
    const PasswordValidatorHelper = new PasswordValidatorHelper_1.PasswordValidatorImpl();
    // Account.beforeRemote("**", async (ctx: HttpContext<Account>) => {
    //   console.log("methodString: ", ctx.methodString);
    // });
    Account.on('resetPasswordRequest', async (info) => {
        const Email = Account.app.models.Email;
        await (0, reset_password_1.sendResetPasswordEmail)(Email, info);
    });
    Account.beforeRemote('changePassword', async (ctx) => {
        let password = ctx.args.newPassword;
        let id = ctx.req.accessToken.userId;
        if (password) {
            const isValidPassword = PasswordValidatorHelper.validatePassword(password);
            if (!isValidPassword) {
                throw new error_1.LoopbackError(constants_1.WEAK_PASSWORD_ERROR_MESSAGE, constants_1.WEAK_PASSWORD_STATUS_CODE, constants_1.WEAK_PASSWORD_ERROR_MESSAGE);
            }
            else {
                let acc = await Account.app.models.Account.findOne({
                    where: { id: id },
                });
                const hasPass = await acc.hasPassword(password);
                if (hasPass) {
                    throw new error_1.LoopbackError(constants_1.NEW_PASSWORD_IS_DIFFERENT_FROM_OLD_MESSAGE, constants_1.WEAK_PASSWORD_STATUS_CODE, constants_1.NEW_PASSWORD_IS_DIFFERENT_FROM_OLD);
                }
            }
        }
    });
    Account.getMe = async function (ctx) {
        const accessToken = ctx.req.accessToken;
        if (!accessToken) {
            throw new error_1.LoopbackError('Error logged-in user', 401);
        }
        const userId = accessToken.userId;
        const user = userId && (await Account.findById(userId, { include: 'roles' }));
        if (!user) {
            throw new error_1.LoopbackError('Error not user', 401);
        }
        return user;
    };
    Account.changeRole = async function (ctx) {
        const accessToken = ctx.req.accessToken;
        if (!accessToken) {
            throw new error_1.LoopbackError('Error logged-in user', 401);
        }
        const userId = accessToken.userId;
        const user = userId && (await Account.findById(userId, {}));
        if (!user) {
            throw new error_1.LoopbackError('Error not user', 401);
        }
        const query = ctx.req.query;
        const { accountId, roleId } = query.data;
        const CHANGE_ROLE = `
    UPDATE rolemapping
    SET roleid = ${roleId}
    WHERE principalid = '${accountId}'
    `;
        (0, native_sql_1.executeNativeSql)(Account.app.dataSources.postgres.connector, CHANGE_ROLE, [])
            .then(() => {
            return true;
        })
            .catch(() => {
            return false;
        });
    };
    Account.findNoTeam = async function (ctx) {
        const accessToken = ctx.req.accessToken;
        if (!accessToken) {
            throw new error_1.LoopbackError('Error logged-in user', 401);
        }
        const userId = accessToken.userId;
        const user = userId && (await Account.findById(userId, {}));
        if (!user) {
            throw new error_1.LoopbackError('Error not user', 401);
        }
        const accounts = await Account.find({ where: { teamId: null } });
        return accounts;
    };
    Account.afterRemote('create', async (ctx) => {
        try {
            const userId = ctx.result.id;
            const ADD_ROLE = `
      INSERT INTO rolemapping(principaltype,principalid,roleid)
      VALUES ('USER','${userId}',3) 
      `;
            (0, native_sql_1.executeNativeSql)(Account.app.dataSources.postgres.connector, ADD_ROLE, [])
                .then(() => { })
                .catch(() => { });
        }
        catch (error) {
            console.log(error);
        }
    });
};
//# sourceMappingURL=account.js.map