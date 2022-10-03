import { NextFunction, Request, Response } from "express";
import { ACCESS_DENIED, BAD_REQUEST } from "@utils/messages/errorResponse";
import JWT from "@utils/jwt";
import userMessages from "@utils/messages/user";
import { UserRole } from "@context/user/domain/User";
import Bcrypt from "@utils/bcrypt";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send({ message: BAD_REQUEST });
  const verified = new JWT().verify(token);
  if (verified === ACCESS_DENIED) {
    return res.status(400).send({ message: verified });
  }
  if (Object.values(verified)[3] <= new Date().toISOString()) {
    return res.status(404).send({ message: userMessages.EXPIRED_TOKEN });
  }
  const isAdmin = await new Bcrypt().compare(
    UserRole.admin,
    Object.values(verified)[0].role
  );
  req.userRole = isAdmin ? UserRole.admin : UserRole.client;
  req.userId = Object.values(verified)[0].id;
  return next();
};

export default validateToken;
