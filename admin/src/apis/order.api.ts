import { Method, request } from "../helper/request.helper";
import { IOrder } from "../interface/Order.interface";

export class OrderAPI {
  static readonly COMPONENT_NAME: string = "Orders";

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
    });
  };

  static fetchByAccount = (accountId: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: {
            accountId,
          },
        },
      },
    });
  };

  static delete = (id: number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static add = (data: IOrder) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static update = (id: number, data: IOrder) => {
    return request({
      method: Method.PATCH,
      url: `/${this.COMPONENT_NAME}/${id}`,
      data,
    });
  };
}
