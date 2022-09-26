import { NextFunction, Request, Response } from "express";
import { NOT_FOUND } from "@utils/messages/errorResponse";
import FindQuoteByIdUseCases from "@context/quote/infra/useCases/findQuoteById";

const notFoundQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const findById = new FindQuoteByIdUseCases();
  const quote = await findById.exec(Number(id));

  if (!quote) return res.status(404).json({ message: NOT_FOUND });
  req.userIdOfQuote = quote.id;
  return next();
};

export default notFoundQuote;
