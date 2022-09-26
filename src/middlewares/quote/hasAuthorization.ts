import { NextFunction, Request, Response } from "express";
import { UserRole } from "@context/user/domain/User";
import { NOT_AUTHORIZATION } from "@utils/messages/errorResponse";

const hasAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const userIdOfQuote = req.userIdOfQuote || -1;
  if (req.userRole === UserRole.admin || userIdOfQuote === req.userId) {
    return next();
  }
  return res.status(400).send({
    message: NOT_AUTHORIZATION,
  });
};

export default hasAuthorization;
