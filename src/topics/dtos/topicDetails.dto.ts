import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

class User {
  @ApiProperty({ type: String })
  @IsString()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;
}

export class TopicDetailsResponseDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: [User] })
  @IsArray()
  usersList: User[];
}