import { IBase } from './Base.interface';

export interface ITarget extends IBase {
  id?: number;
  revenue?: number;
  worksday?: number;
  month?: number;
  accountId?: number;
}
