/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";
import quoteMessages from "@utils/messages/quote";
import CreateQuoteUseCases from "../useCases/createQuote";
import DeleteQuoteUseCases from "../useCases/deleteQuote";
import FindAllQuotesUseCases from "../useCases/findAllQuotes";
import FindOneQuoteUseCases from "../useCases/findOneQuote";
import FindQuoteByIdUseCases from "../useCases/findQuoteById";
import UpdateQuoteUseCases from "../useCases/updateQuote";

export default class QuoteController {
  async store(req: Request, res: Response): Promise<Response> {
    const quote = req.body;
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
    return res.status(200).json();
  }
}
