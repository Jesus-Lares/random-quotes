import { NextFunction, Request, Response } from "express";
import { NOT_FOUND } from "@utils/messages/errorResponse";
import FindOneUserUseCases from "@context/user/infra/useCases/findOneUser";

const validateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { apiKey } = req.params;
  const find = new FindOneUserUseCases();
  const user = await find.exec({ apiKey });
  if (!user) return res.status(404).json({ message: NOT_FOUND });
  req.userId = user.id;
  req.userRole = user.role;
  return next();
};

export default validateApiKey;
