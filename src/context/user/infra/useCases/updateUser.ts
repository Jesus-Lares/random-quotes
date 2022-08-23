import UserRepository from "@context/user/application/user.repository";
import { User } from "@context/user/domain/User";

export default class UpdateUserUseCases {
  async exec(id: number, item: User) {
    const userRepository = new UserRepository();
    const user = await userRepository.update(id, item);
    return user?.get() || null;
  }
}
