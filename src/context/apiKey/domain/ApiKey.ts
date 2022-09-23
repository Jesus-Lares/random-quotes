export const enum StatusApiKey {
  active = "active",
  inactive = "inactive",
}

export interface ApiKey {
  userId: number;
  status?: StatusApiKey;
  key?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
