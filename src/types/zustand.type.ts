import { PersistOptions } from "zustand/middleware";

export interface ICreateStoreOptions<T, U> {
  persistOptions?: PersistOptions<T, U>;
  devtoolsEnabled?: boolean;
}
