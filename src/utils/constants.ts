export const enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3,
  M1 = H24 * 30,
}

export type typesObjectString = {
  [key: string]: string;
};
