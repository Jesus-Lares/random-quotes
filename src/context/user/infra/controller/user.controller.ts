/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "@utils/jwt";
import userMessages from "@utils/messages/user";
import Bcrypt from "@utils/bcrypt";
import CreateUserUseCases from "../useCases/createUser";
import DeleteUserUseCases from "../useCases/deleteUser";
import FindAllUsersUseCases from "../useCases/findAllUsers";
import FindOneUserUseCases from "../useCases/findOneUser";
import FindUserByIdUseCases from "../useCases/findUserById";
import UpdateUserUseCases from "../useCases/updateUser";

export default class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    // Middleware to find if the email exist in other user
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
    // middleware to user login
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
    await deleteUser.exec(Number(id));
    // TODO: delete all quotes of the user
    return res.status(200).json({ message: userMessages.DELETE_SUCCESS });
  }
}
