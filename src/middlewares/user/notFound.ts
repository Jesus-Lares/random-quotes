import { NextFunction, Request, Response } from "express";
import { NOT_FOUND } from "@utils/messages/errorResponse";
import FindUserByIdUseCases from "@context/user/infra/useCases/findUserById";

const notFoundUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id || req.userId;
  const findById = new FindUserByIdUseCases();
  const user = await findById.exec(Number(id));

  if (!user) return res.status(404).json({ message: NOT_FOUND });

  return next();
};

export default notFoundUser;
