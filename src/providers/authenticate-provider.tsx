"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { LayoutProps } from "../types";
import Auth from "@/app/(auth)/authProvider";

const AuthenticateProvider = ({ children }: LayoutProps) => {
  return (
    <Authenticator.Provider>
      <Auth>{children}</Auth>
    </Authenticator.Provider>
  );
};

export default AuthenticateProvider;
