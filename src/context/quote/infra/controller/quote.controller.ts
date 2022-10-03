/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";
import quoteMessages from "@utils/messages/quote";
import CreateDailyQuoteUseCases from "@context/dailyQuote/infra/useCases/createDailyQuote";
import DeleteDailyQuoteUseCases from "@context/dailyQuote/infra/useCases/deleteDailyQuote";
import FindAllViewQuotesUseCases from "@context/viewQuote/infra/useCases/findAllViewQuotes";
import DeleteViewQuoteUseCases from "@context/viewQuote/infra/useCases/deleteViewQuote";
import AddAllViewQuoteUseCases from "@context/viewQuote/infra/useCases/addAllViewQuotes";
import { UserRole } from "@context/user/domain/User";
import CreateQuoteUseCases from "../useCases/createQuote";
import DeleteQuoteUseCases from "../useCases/deleteQuote";
import FindAllQuotesUseCases from "../useCases/findAllQuotes";
import FindOneQuoteUseCases from "../useCases/findOneQuote";
import FindQuoteByIdUseCases from "../useCases/findQuoteById";
import UpdateQuoteUseCases from "../useCases/updateQuote";

export default class QuoteController {
  async store(req: Request, res: Response): Promise<Response> {
    const { userId, userRole } = req;
    const quote = req.body;
    quote.user ??= userId;
    quote.role ??= userRole;
    const createQuote = new CreateQuoteUseCases();
    const quoteResult = await createQuote.exec(quote);
    return res.status(200).send({
      message: quoteMessages.CREATE_SUCCESS,
      quote: quoteResult,
    });
  }

  async search(req: Request, res: Response): Promise<Response> {
    const searchQuote = new FindAllQuotesUseCases();
    const quote = await searchQuote.exec(req.query);
    return res.status(200).json(quote);
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const findOneQuote = new FindOneQuoteUseCases();
    const quote = await findOneQuote.exec(req.query);
    return res.status(200).json(quote);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findQuote = new FindQuoteByIdUseCases();
    const quote = await findQuote.exec(Number(id));
    return res.status(200).json(quote);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateQuote = new UpdateQuoteUseCases();
    const quote = await updateQuote.exec(Number(id), req.body);
    return res
      .status(200)
      .json({ quote, message: quoteMessages.UPDATE_SUCCESS });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteQuote = new DeleteQuoteUseCases();
    await deleteQuote.exec(Number(id));
    return res.status(200).json({ message: quoteMessages.DELETE_SUCCESS });
  }

  async getRandom(req: Request, res: Response): Promise<Response> {
    const { userId = -1, userRole } = req;
    const findAllViewQuotes = new FindAllViewQuotesUseCases();
    const addAllViewQuote = new AddAllViewQuoteUseCases();
    const deleteViewQuotes = new DeleteViewQuoteUseCases();
    const deleteDailyQuote = new DeleteDailyQuoteUseCases();
    const findQuote = new FindQuoteByIdUseCases();
    await deleteDailyQuote.exec(userId);
    let viewQuotes = await findAllViewQuotes.exec({ user: userId });
    if (!viewQuotes.length) {
      viewQuotes = await addAllViewQuote.exec(
        userId,
        userRole === UserRole.admin
      );
    }
    let quote = null;
    do {
      const random = Math.floor(Math.random() * viewQuotes.length);
      const quoteRandom = viewQuotes[random]?.get();
      if (viewQuotes.length - 1) viewQuotes = viewQuotes.splice(random, 1);
      else viewQuotes = [];
      await deleteViewQuotes.exec({
        user: userId,
        quote: quoteRandom.quote,
      });
      quote = await findQuote.exec(quoteRandom.quote);
      if (!viewQuotes.length) {
        viewQuotes = await addAllViewQuote.exec(
          userId,
          userRole === UserRole.admin
        );
      }
    } while (!quote);
    const createDailyQuote = new CreateDailyQuoteUseCases();
    await createDailyQuote.exec({ userId, quote: quote.id });
    return res.status(200).json({ quote });
  }
}
