import UserRepository from "@context/user/application/user.repository";

export default class FindAllUsersUseCases {
  exec(query: object) {
    const userRepository = new UserRepository();
    return userRepository.find(query);
  }
}
