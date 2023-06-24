/** @format */

import { IBase } from './Base.interface';
import { IRole } from './Role.interface';

export interface IAccount extends IBase {
  id?: number;
  username?: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  teamId?: number | null;
  roleId?: number;
  avatar?: string;
  typeRole?: string;
  roles?: IRole[];
}
