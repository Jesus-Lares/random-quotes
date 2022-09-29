import { User } from "@context/user/domain/User";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validParamsQuote = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as User;

  const schemaRules = Joi.object({
    quote: Joi.string().required(),
    writer: Joi.string().required(),
    role: Joi.string().required(),
    user: Joi.number().required(),
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

export default validParamsQuote;
