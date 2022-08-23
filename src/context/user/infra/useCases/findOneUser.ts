import UserRepository from "@context/user/application/user.repository";

export default class FindOneUserUseCases {
  async exec(query: object) {
    const userRepository = new UserRepository();
    const user = await userRepository.findOne(query);
    return user?.get() || null;
  }
}
