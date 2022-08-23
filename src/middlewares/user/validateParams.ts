import { User } from "@context/user/domain/User";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validParamsUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as User;

  const schemaRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    age: Joi.number().required(),
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

export default validParamsUser;
