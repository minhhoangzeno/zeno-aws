import { Context } from 'loopback';
import { Account } from '../../codegen/api/fetch/api';
import { App } from '../../common/helpers/loopback';

import { HttpContext } from '../../common/helpers/loopback';

module.exports = function (app: App) {
  const remotes = app.remotes();

  // Set X-Total-Count for all find requests
  remotes.after(
    '*.find',
    function (this: any, ctx: HttpContext<any>, next: any) {
      var filter;

      if (ctx.args && ctx.args.filter) {
        try {
          filter = JSON.parse(ctx.args.filter).where;
        } catch (e) {
          filter = ctx.args.filter.where;
        }
      }

      if (!ctx.res.headersSent) {
        this.count(filter, function (err: any, count: any) {
          ctx.res.set('X-Total-Count', count);
          next();
        });
      } else {
        next();
      }
    },
  );
};
