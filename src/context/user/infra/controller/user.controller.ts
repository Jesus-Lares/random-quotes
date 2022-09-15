/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";
import JWT from "@utils/jwt";
import userMessages from "@utils/messages/user";
import Bcrypt from "@utils/bcrypt";
import DeleteQuoteByUserIdUseCases from "@context/quote/infra/useCases/deleteQuoteByUserId";
import DeleteViewQuoteByUserIdUseCases from "@context/viewQuote/infra/useCases/deleteQuoteByUserId";
import CreateUserUseCases from "../useCases/createUser";
import DeleteUserUseCases from "../useCases/deleteUser";
import FindAllUsersUseCases from "../useCases/findAllUsers";
import FindOneUserUseCases from "../useCases/findOneUser";
import FindUserByIdUseCases from "../useCases/findUserById";
import UpdateUserUseCases from "../useCases/updateUser";

export default class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { password, ...userData } = req.body;
    const user = {
      ...userData,
      password: await new Bcrypt().encrypt(password),
    };
    const createUser = new CreateUserUseCases();
    const userResult = await createUser.exec(user);
    const userToken = {
      id: userResult.id,
      name: user.name,
      role: await new Bcrypt().encrypt(userResult.role),
    };
    return res.status(200).send({
      message: userMessages.CREATE_SUCCESS,
      token: new JWT().sign({ user: userToken }),
    });
  }

  async signIn(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;
    const findOneUser = new FindOneUserUseCases();
    const user = await findOneUser.exec({ email });
    if (!user) {
      return res.status(400).send({ message: userMessages.EMAIL_NOT_EXIST });
    }
    const passwordCheck = await new Bcrypt().compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).send({ message: userMessages.WRONG_PASSWORD });
    }
    const userToken = {
      id: user.id,
      name: user.name,
      role: await new Bcrypt().encrypt(user.role),
    };
    return res.status(200).send({
      message: userMessages.GET,
      token: new JWT().sign({ user: userToken }),
    });
  }

  async search(req: Request, res: Response): Promise<Response> {
    const searchUser = new FindAllUsersUseCases();
    const user = await searchUser.exec(req.query);
    return res.status(200).json(user);
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const findOneUser = new FindOneUserUseCases();
    const user = await findOneUser.exec(req.query);
    return res.status(200).json(user);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findUser = new FindUserByIdUseCases();
    const user = await findUser.exec(Number(id));
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateUser = new UpdateUserUseCases();
    const user = await updateUser.exec(Number(id), req.body);
    return res.status(200).json({ user, message: userMessages.UPDATE_SUCCESS });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUser = new DeleteUserUseCases();
    const deleteQuote = new DeleteQuoteByUserIdUseCases();
    const deleteViewQuote = new DeleteViewQuoteByUserIdUseCases();
    await deleteUser.exec(Number(id));
    await deleteQuote.exec(Number(id));
    await deleteViewQuote.exec(Number(id));
    return res.status(200).json({ message: userMessages.DELETE_SUCCESS });
  }
}
