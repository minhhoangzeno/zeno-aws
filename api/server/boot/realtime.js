"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es = require('event-stream');
module.exports = function (app) {
    const Order = app.models.Order;
    Order.createChangeStream(function (err, changes) {
        changes.pipe(es.stringify()).pipe(process.stdout);
    });
    Order.create({
        numberOfCall: 20
    });
};
//# sourceMappingURL=realtime.js.map