import { UserRole } from "../../../src/context/user/domain/User";
import JWT from "../../../src/utils/jwt";
import Bcrypt from "../../../src/utils/bcrypt";

const makeToken = async (id: number, name: string, role = UserRole.client) => {
  const userToken = {
    id,
    name,
    role: await new Bcrypt().encrypt(role),
  };
  return new JWT().sign({ user: userToken });
};

export default makeToken;
