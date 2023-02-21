import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateTopicBodyDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  name?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [String] })
  newlyAddedUsers?: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({ type: [String] })
  removedUsers?: string[];
}
