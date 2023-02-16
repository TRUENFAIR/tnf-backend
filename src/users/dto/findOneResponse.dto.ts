import { UserInfoDto } from "src/@common/dtos/userInfo.dto";

export class FindOneResponseDto extends UserInfoDto {
  password: string;
}
