import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTopicDtp {
  @IsString()
  @ApiProperty({ type: String })
  name: string;
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  description?: string;
  @IsArray()
  @ApiProperty({ type: [String] })
  userIdList: [string];
}
