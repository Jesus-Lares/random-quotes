export const enum StatusApiKey {
  active = "active",
  inactive = "inactive",
}

export interface ApiKey {
  userId: number;
  key: string;
  status: StatusApiKey;
  createdAt?: Date;
  updatedAt?: Date;
}
