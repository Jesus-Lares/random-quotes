import { NextFunction, Request, Response } from "express";
import { ACCESS_DENIED, BAD_REQUEST } from "@utils/errorsMessage";

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const token = req.header("auth-token");

    if (!token) {
      return res.status(404).json({
        message: ACCESS_DENIED,
      });
    }

    return next();
  } catch (error) {
    return res.status(404).json({
      message: BAD_REQUEST,
    });
  }
};

export default validateToken;
