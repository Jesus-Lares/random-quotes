import bcrypt from "bcrypt";

class Bcrypt {
  private saltRounds = 10;

  async encrypt(
    text: string,
    saltRounds: number = this.saltRounds
  ): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(text, salt);
    return hash;
  }

  compare(text: string, hash: string): Promise<boolean> {
    const isValid = bcrypt.compare(text, hash);
    return isValid;
  }
}

export default Bcrypt;
