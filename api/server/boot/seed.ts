import { App, PersistedModelStatic } from '../../common/helpers/loopback';
import {
  Account,
  Role,
  RoleMapping,
  DurationTime,
  Order,
  Target,
  Team,
} from '../../codegen/api/fetch/api';

module.exports = function (app: App) {
  const withoutId = (it: any) => Object.assign({}, it, { id: undefined });

  const automigrate = (dataSource: string) => (model: string) => {
    return new Promise<PersistedModelStatic<any>>((resolve, reject) => {
      app.dataSources[dataSource].automigrate(model, function (err: Error) {
        if (err) {
          return reject(err);
        }
        resolve(app.models[model]);
      });
    });
  };

  const autoupdate = (dataSource: string) => (model: string) => {
    return new Promise<PersistedModelStatic<any>>((resolve, reject) => {
      app.dataSources[dataSource].autoupdate(model, function (err: Error) {
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
    const [
      ACL,
      AccountToken,
      RoleMapping,
      Role,
      Account,
      DurationTime,
      Order,
      Target,
      Team,
    ] = await Promise.all(
      [
        'ACL',
        'AccountToken',
        'RoleMapping',
        'Role',
        'Account',
        'DurationTime',
        'Order',
        'Target',
        'Team',
      ].map(
        process.env.NODE_ENV === 'production'
          ? automigrate('postgres')
          : autoupdate('postgres'),
      ),
    );
    
    return;
    console.log('Seeding start...');

    const roles: Role[] = [
      { id: 1, name: 'ADMIN', description: '' },
      { id: 2, name: 'LEADER', description: '' },
      { id: 3, name: 'USER', description: '' },
    ];

    for (const role of roles) {
      await Role.create(withoutId(role));
    }
    const accounts: Account[] = [];
    accounts.push({
      id: 1,
      username: `admin`,
      email: 'admin@dreambuilder.net',
      password: '1',
      name: 'Admin',
      phone: '0123456789',
      typeRole: 'ADMIN'
    } as Account);

    accounts.push({
      id: 2,
      username: `leader`,
      email: 'leader@dreambuilder.net',
      password: '1',
      name: 'Leader',
      phone: '123456789',
      typeRole: 'LEADER'
    } as Account);

    accounts.push({
      id: 3,
      username: `user`,
      email: 'user@dreambuilder.net',
      password: '1',
      name: 'User',
      phone: '123456789',
      typeRole: 'USER'
    } as Account);

    accounts.push({
      id: 4,
      username: `hoangminh`,
      email: 'hoangminh@dreambuilder.net',
      password: '1',
      name: 'Hoang Minh',
      phone: '123456789',
      typeRole: 'ADMIN'
    } as Account);

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

      const roleMapping: RoleMapping = {
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
