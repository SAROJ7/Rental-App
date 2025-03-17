export type AuthState = {
  authUser: User;
};

export type AuthStateAction = {
  setAuthUser: (user: User) => void;
  clearAuthUser: () => void;
};

export type AuthStore = AuthState & AuthStateAction;
