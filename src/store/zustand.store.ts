import { ICreateStoreOptions } from "@/types/zustand.type";
import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";
import { devtools, persist } from "zustand/middleware";
export function zustandStore<T extends object>(
  createState: StateCreator<T>,
  options: ICreateStoreOptions<T, unknown>
): UseBoundStore<StoreApi<T>> {
  let store = create(createState);

  if (options.persistOptions) {
    store = create(persist(createState, options.persistOptions));
  }

  if (options.devtoolsEnabled) {
    store = create(devtools(createState));
  }

  if (options.devtoolsEnabled && options.persistOptions) {
    store = create(devtools(persist(createState, options.persistOptions)));
  }

  return store;
}
