import UserRepository from "@context/user/application/user.repository";

export default class DeleteUserUseCases {
  exec(id: number) {
    const userRepository = new UserRepository();
    return userRepository.delete(id);
  }
}
