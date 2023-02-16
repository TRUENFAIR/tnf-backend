import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginInputDto {
  @IsString()
  @ApiProperty({ type: String })
  username: string;

  @IsString()
  @ApiProperty({ type: String })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: String })
  accessToken: string;
}
