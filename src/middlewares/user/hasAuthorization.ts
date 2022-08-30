import { NextFunction, Request, Response } from "express";
import { UserRole } from "@context/user/domain/User";
import { NOT_AUTHORIZATION } from "@utils/messages/errorResponse";

const hasAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (req.userRole === UserRole.admin || Number(id) === req.userId) next();
  return res.status(400).send({
    message: NOT_AUTHORIZATION,
  });
};

export default hasAuthorization;
