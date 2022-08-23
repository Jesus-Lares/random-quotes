import UserRepository from "@context/user/application/user.repository";

export default class FindUserByIdUseCases {
  async exec(id: number) {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(id);
    return user?.get() || null;
  }
}
