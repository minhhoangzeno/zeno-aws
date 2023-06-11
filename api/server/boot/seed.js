"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (app) {
    const withoutId = (it) => Object.assign({}, it, { id: undefined });
    const automigrate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].automigrate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    const autoupdate = (dataSource) => (model) => {
        return new Promise((resolve, reject) => {
            app.dataSources[dataSource].autoupdate(model, function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(app.models[model]);
            });
        });
    };
    //return;
    // auto update
    (async () => {
        const [ACL, AccountToken, RoleMapping, Role, Account, DurationTime, Order, Target, Team,] = await Promise.all([
            'ACL',
            'AccountToken',
            'RoleMapping',
            'Role',
            'Account',
            'DurationTime',
            'Order',
            'Target',
            'Team',
        ].map(process.env.NODE_ENV === 'production'
            ? automigrate('postgres')
            : autoupdate('postgres')));
        return;
        console.log('Seeding start...');
        const roles = [
            { id: 1, name: 'ADMIN', description: '' },
            { id: 2, name: 'LEADER', description: '' },
            { id: 3, name: 'USER', description: '' },
        ];
        for (const role of roles) {
            await Role.create(withoutId(role));
        }
        const accounts = [];
        accounts.push({
            id: 1,
            username: `admin`,
            email: 'admin@dreambuilder.net',
            password: '1',
            name: 'Admin',
            phone: '123456789',
        });
        accounts.push({
            id: 2,
            username: `leader`,
            email: 'leader@dreambuilder.net',
            password: '1',
            name: 'Leader',
            phone: '123456789',
        });
        accounts.push({
            id: 3,
            username: `user`,
            email: 'user@dreambuilder.net',
            password: '1',
            name: 'User',
            phone: '123456789',
        });
        accounts.push({
            id: 4,
            username: `hoangminh`,
            email: 'hoangminh@dreambuilder.net',
            password: '1',
            name: 'Hoang Minh',
            phone: '123456789',
        });
        for (let account of accounts) {
            const item = await Account.create(withoutId(account));
            const roleId = (() => {
                switch (item.id) {
                    case 1:
                        return 1;
                    case 2:
                        return 2;
                    case 3:
                        return 3;
                    case 4:
                        return 1;
                    default:
                        return 3;
                }
            })();
            const roleMapping = {
                principalId: item.id,
                principalType: 'USER',
                roleId: roleId,
            };
            await RoleMapping.create(roleMapping);
        }
        console.log('Seeding end!!!');
    })().catch((e) => {
        console.log(e);
    });
};
//# sourceMappingURL=seed.js.map