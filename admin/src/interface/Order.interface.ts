import { IAccount } from "./Account.interface";
import { IBase } from "./Base.interface";
import { IDurationTime } from "./DurationTime.interface";
import { ITeam } from "./Team.interface";

export interface IOrder extends IBase {
  id?: number;
  numberOfCall?: number; // đã gọi
  numberOfAdvise?: number; // đã tư vấn
  numberOfOrder?: number; // đã chốt
  numberOfAccepted?: number; // đã xác nhận
  revenueOfOrder?: number; // doanh thu chốt
  revenueOfAccepted?: number; // doanh thu xác nhận
  durationTimeId?: number;
  accountId?: number;
  teamId?: number | null;
  durationTime?: IDurationTime;
  account?: IAccount;
  team?: ITeam;
}
