import { NextFunction, Request, Response } from "express";
import UserRepository from "@context/user/application/user.repository";
import userMessages from "@utils/messages/user";

const emailExist = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const userRepository = new UserRepository();
  const user = await userRepository.findOne({ email });
  if (user) return res.status(404).json({ message: userMessages.EMAIL_EXIST });
  return next();
};

export default emailExist;
