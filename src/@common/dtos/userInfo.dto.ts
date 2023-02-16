export class UserInfoDto {
  userId: string;
  username: string;
  fullname: string;
  admin: {
    userId: string;
    tenantId: string;
    loginname: string;
  };
  role: {
    name: string;
    code: string;
  };
}
