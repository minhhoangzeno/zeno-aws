/** @format */

import { IBase } from './Base.interface';
import { UserLevels } from './constants/UserLevels.const';
import { IRole } from './Role.interface';

export interface IAccount extends IBase {
  id?: number;
  username?: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  teamId?: number;
  roleId?: number;
  avatar?: string;
  typeRole?: string;
  roles?: IRole[];
}
