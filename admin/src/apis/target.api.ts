import { Method, request } from '../helper/request.helper';
import { ITarget } from '../interface/Target.interface';

export class TargetAPI {
  static readonly COMPONENT_NAME: string = 'Targets';

  static fetchById = (id?: number, month?: number, year?: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          order: 'createdAt DESC',
          where: {
            accountId: id,
            month: month,
            year: year,
          },
        },
      },
    });
  };

  static create = (data: ITarget) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static put = (data: ITarget) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };

  static update = (id: number, data: ITarget) => {
    return request({
      method: Method.PATCH,
      url: `/${this.COMPONENT_NAME}/${id}`,
      data,
    });
  };
}
