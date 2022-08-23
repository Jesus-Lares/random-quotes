import { NextFunction, Request, Response } from "express";
import UserRepository from "@context/user/application/user.repository";
import { NOT_FOUND } from "@utils/errorsMessage";

const notFoundUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userRepository = new UserRepository();
  const user = await userRepository.findById(Number(id));

  if (!user) return res.status(404).json({ message: NOT_FOUND });

  return next();
};

export default notFoundUser;
