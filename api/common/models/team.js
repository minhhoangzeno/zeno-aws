"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (Team) {
    // Team.beforeRemote("**", async (ctx: HttpContext<Team>) => {
    //   console.log("methodString: ", ctx.methodString);
    // });
    Team.afterRemote('deleteById', async (ctx) => {
        const Account = Team.app.models.Account;
        const teamId = ctx.args.id;
        const accounts = await Account.find({ where: { teamId } });
        if (accounts.length > 0) {
            accounts.forEach((el) => {
                el.teamId = null;
                el.save();
            });
        }
    });
};
//# sourceMappingURL=team.js.map