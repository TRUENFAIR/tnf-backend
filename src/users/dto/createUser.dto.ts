import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  lastName: string;

}

export class CreateUserResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  userId: string;

  @IsString()
  @ApiProperty({ type: String })
  username: string;

  @IsString()
  @ApiProperty({ type: String })
  password: string;
}