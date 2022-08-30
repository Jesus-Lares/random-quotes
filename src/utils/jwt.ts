import jwt from "jsonwebtoken";
import env from "@config/env";
import { IJwt } from "@interface/IJwt";
import { EXPIRETIME } from "./constants";
import { ACCESS_DENIED } from "./messages/errorResponse";

class JWT {
  private secreteKey = env.secretKey as string;

  sign(data: IJwt, expiresIn: number = EXPIRETIME.M1) {
    return jwt.sign(
      { user: data.user },
      this.secreteKey,
      { expiresIn } // 30 dias
    );
  }

  verify(token: string = "") {
    try {
      return jwt.verify(token, this.secreteKey);
    } catch (error) {
      return ACCESS_DENIED;
    }
  }
}

export default JWT;
