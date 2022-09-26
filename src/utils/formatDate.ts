import { EXPIRETIME, typesObjectString } from "./constants";

const typesOfFormat: typesObjectString = {
  database: {
    from: "-",
    to: "/",
  },
  date: {
    from: "/",
    to: "-",
  },
};

class FormatDate {
  generateExpiredDate({ today = new Date(), expiresIn = EXPIRETIME.H24 }) {
    const expired = new Date(
      today.getTime() + expiresIn * 1000
    ).toLocaleDateString();
    return this.formatDate(expired);
  }

  formatDate(expired: string, type = "date") {
    const date = expired.split(typesOfFormat[type].from);
    return [
      this.addCeros(date[2]),
      this.addCeros(date[1]),
      this.addCeros(date[0]),
    ].join(typesOfFormat[type].to);
  }

  addCeros(number: string) {
    if (number.length === 4 || number.length === 2) return number;
    return `0${number}`;
  }
}

export default FormatDate;