import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class Item {
  @IsString()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @ApiProperty({ type: String })
  name: string;
}

export class ListTopicsResponseDto {
  @IsArray()
  @ApiProperty({ type: [Item] })
  assignedTopics: Item[];

  @IsArray()
  @ApiProperty({ type: [Item] })
  createdTopics: Item[];
}
export class ListTopicsQueryDto {
  @IsString()
  @ApiProperty({ type: String })
  type: "all-topics" | "my-topics";
}

export class ListUserResponseDto {
  @IsString()
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  tenetId: string;
}
