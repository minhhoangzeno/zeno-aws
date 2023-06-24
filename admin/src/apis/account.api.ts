import { Method, request } from "../helper/request.helper";
import { IAccount } from "../interface/Account.interface";
import { IForgotPassword } from "../interface/request/ForgotPassword.interface";
import { IResetPassword } from "../interface/request/ResetPassword.interface";

export class AccountAPI {
  static readonly COMPONENT_NAME: string = "Accounts";

  static login = ({ email, password }: { email: string; password: string }) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/login`,
      data: {
        email,
        password,
      },
    });
  };

  static add = (data: IAccount) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}`,
      data: data,
    });
  };

  static getMe = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/get-me`,
      params: {
        filter: {
          include: "role",
        },
      },
    });
  };

  static getMeWithToken = (token: string) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/get-me`,
      headers: {
        Authorization: token,
      },
    });
  };

  static logout = () => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/logout`,
    });
  };

  static fetchAll = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          include: "roles",
          order: "updatedAt ASC",
        },
      },
    });
  };
  static fetchWhereTeam = (number: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: {
            teamId: number,
          },
          order: "updatedAt ASC",
        },
      },
    });
  };

  static fetchNoWhereTeam = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}`,
      params: {
        filter: {
          where: {
            teamId: { like: null },
          },
          order: "updatedAt ASC",
        },
      },
    });
  };
  static fetchWhereNoTeam = () => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/no-team`,
      params: {
        filter: {
          order: 'updatedAt ASC',
        },
      },
    });
  };
  static getAccountById = (id: number) => {
    return request({
      method: Method.GET,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };
  static update = (id: number, data: IAccount) => {
    return request({
      method: Method.PATCH,
      url: `/${this.COMPONENT_NAME}/${id}`,
      data,
    });
  };
  static put = (data: IAccount[]) => {
    return request({
      method: Method.PUT,
      url: `/${this.COMPONENT_NAME}`,
      data,
    });
  };
  static delete = (id: number) => {
    return request({
      method: Method.DELETE,
      url: `/${this.COMPONENT_NAME}/${id}`,
    });
  };

  static changeRole = (accountId: number, roleId: number) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/change-role`,
      params: {
        data: {
          accountId,
          roleId,
        },
      },
    });
  };

  static reset = (data: IForgotPassword) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/reset`,
      data: data,
    });
  };
  static resetPassword = (data: IResetPassword, token: string) => {
    return request({
      method: Method.POST,
      url: `/${this.COMPONENT_NAME}/reset-password`,
      headers: {
        Authorization: token,
      },
      data: data,
    });
  };
}
