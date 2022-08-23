/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";
import CreateUserUseCases from "../useCases/createUser";
import DeleteUserUseCases from "../useCases/deleteUser";
import FindAllUsersUseCases from "../useCases/findAllUsers";
import FindOneUserUseCases from "../useCases/findOneUser";
import FindUserByIdUseCases from "../useCases/findUserById";
import UpdateUserUseCases from "../useCases/updateUser";

export default class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const createUser = new CreateUserUseCases();
    const user = await createUser.exec(req.body);
    return res.status(200).json(user);
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
    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUser = new DeleteUserUseCases();
    await deleteUser.exec(Number(id));
    return res.status(200).json({ message: "User deleted" });
  }
}
