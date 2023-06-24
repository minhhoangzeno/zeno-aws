import { Team } from '../../codegen/api/fetch/api';

import { PersistedModelStatic } from '../helpers/loopback';

module.exports = function (Team: PersistedModelStatic<Team>) {
  // Team.beforeRemote("**", async (ctx: HttpContext<Team>) => {
  //   console.log("methodString: ", ctx.methodString);
  // });

  (Team as any).afterRemote('deleteById', async (ctx: any) => {
    const Account = Team.app.models.Account;
    const teamId = ctx.args.id;

    const accounts = await Account.find({ where: { teamId } });
    if (accounts.length > 0) {
      accounts.forEach((el: any) => {
        el.teamId = null;
        el.save();
      });
    }
  });
};
