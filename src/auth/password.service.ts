import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class PasswordService {
  async hash(password: string) {
    const saltRound = +process.env.SALT_ROUND;
    if (!saltRound) {
      throw new InternalServerErrorException("SALT_ROUND not found!");
    }
    return hash(password, saltRound);
  }

  async compare(password: string, hashPassword: string) {
    return compare(password, hashPassword);
  }
}
