import { IAccount } from './Account.interface';
import { IBase } from './Base.interface';

export interface ITeam extends IBase {
  id?: number;
  name?: string;
  leaderId?: number | null;
  leader?: IAccount;
  members?: IAccount[];
}
