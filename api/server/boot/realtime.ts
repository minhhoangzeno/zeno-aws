import { App } from '../../common/helpers/loopback';

var es = require('event-stream');

module.exports = function (app: App) {
  const Order = app.models.Order;
  Order.createChangeStream(function (err: any, changes: any) {
    changes.pipe(es.stringify()).pipe(process.stdout);
  });
};
