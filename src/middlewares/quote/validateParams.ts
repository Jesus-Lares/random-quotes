import { Quote } from "@context/quote/domain/Quote";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validParamsQuote = (req: Request, res: Response, next: NextFunction) => {
  const quote = req.body as Quote;

  const schemaRules = Joi.object({
    quote: Joi.string().required(),
    writer: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  const { error } = schemaRules.validate(quote, options);
  if (error?.details) {
    const errorMessages = error.details.map((error) => error.message);
    return res.status(400).json({
      body: errorMessages,
    });
  }
  return next();
};

export default validParamsQuote;
