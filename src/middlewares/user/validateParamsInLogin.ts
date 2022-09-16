import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validParamsInLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  const schemaRules = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error } = schemaRules.validate(user, options);
  if (error?.details) {
    const errorMessages = error.details.map((error) => error.message);
    return res.status(400).json({
      body: errorMessages,
    });
  }
  return next();
};

export default validParamsInLogin;
