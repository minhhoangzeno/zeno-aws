import { Method, request } from "../helper/request.helper";
import { IDurationTime } from "../interface/DurationTime.interface";

export class DurationTimeAPI {
  static readonly COMPONENT_NAME: string = "DurationTimes";

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
    });
  };

  static delete = (id: number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static add = (data: IDurationTime) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static update = (id: number, data: IDurationTime) => {
    return request({
      method: Method.PATCH,
      url: `/${this.COMPONENT_NAME}/${id}`,
      data,
    });
  };
}
