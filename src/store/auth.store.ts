import { AuthStore } from "@/types/auth";
import { zustandStore } from "./zustand.store";
import { localStore } from "./local.store";

export const useAuthStore = zustandStore<AuthStore>(
  (set) => ({
    authUser: null,
    setAuthUser: (user: AuthStore["authUser"]) => set({ authUser: user }),
    clearAuthUser: () => set({ authUser: null }),
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: "authStore",
      storage: localStore,
    },
  }
);
