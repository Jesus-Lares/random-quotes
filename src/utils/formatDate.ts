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
    console.log(
      new Date(today.getTime() + expiresIn * 1000).toLocaleDateString(),
      new Date(today.getTime()).toLocaleDateString()
    );
    const expired = new Date(
      today.getTime() + expiresIn * 1000
    ).toLocaleDateString();
    return this.formatDate(expired);
  }

  formatDate(expired: string, type = "date") {
    const date = expired.split(typesOfFormat[type].from);
    return [
      this.addCeros(date[2], type),
      this.addCeros(date[1], type),
      this.addCeros(date[0], type),
    ].join(typesOfFormat[type].to);
  }

  addCeros(number: string, type: string) {
    if (number.length === 4 || number.length === 2) return number;
    return `0${number}`;
  }
}

export default FormatDate;
