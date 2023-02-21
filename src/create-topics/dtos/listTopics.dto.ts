import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ListTopicsResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @ApiProperty({ type: String })
  name: string;
}

export class ListTopicsQueryDto {
  @IsString()
  @ApiProperty({ type: String })
  type: "all-topics" | "my-topics";
}
