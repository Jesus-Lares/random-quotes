import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "@utils/messages/errorResponse";
import FindDailyQuoteByUserIdUseCases from "@context/dailyQuote/infra/useCases/findByUserId";
import FindQuoteByIdUseCases from "@context/quote/infra/useCases/findQuoteById";

const hasDailyQuote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = req;
  if (!userId) return res.status(403).send({ message: BAD_REQUEST });
  const find = new FindDailyQuoteByUserIdUseCases();
  const dailyQuote = await find.exec(userId);
  console.log(dailyQuote);
  if (!dailyQuote) return next();
  const today = new Date();
  const expired = dailyQuote.expired.split("-");
  console.log(expired);
  const isExpired = today > new Date(expired[0], expired[1] - 1, expired[2]);
  console.log(
    isExpired,
    today,
    new Date(expired[0], expired[1] - 1, expired[2])
  );
  if (isExpired) return next();
  const findQuote = new FindQuoteByIdUseCases();
  const quote = await findQuote.exec(dailyQuote.quote);
  console.log(quote);
  if (!quote) return next();
  return res.status(200).json({ quote });
};

export default hasDailyQuote;
