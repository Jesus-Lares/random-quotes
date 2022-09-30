import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "@utils/messages/errorResponse";
import FindDailyQuoteByUserIdUseCases from "@context/dailyQuote/infra/useCases/findByUserId";
import FormatDate from "@utils/formatDate";
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
  if (!dailyQuote) return next();
  const formatDate = new FormatDate();
  const today = new Date().toLocaleDateString();
  const expired = formatDate.formatDate(dailyQuote.expired, "database");
  const isExpired = expired < today;
  if (isExpired) return next();
  const findQuote = new FindQuoteByIdUseCases();
  const quote = await findQuote.exec(dailyQuote.quote);
  if (!quote) return next();
  return res.status(200).json({ quote });
};

export default hasDailyQuote;
