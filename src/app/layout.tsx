import { LayoutProps } from "@/types";
import { QueryProvider } from "@/providers/query-provider";
import AuthenticateProvider from "@/providers/authenticate-provider";
import "./globals.css";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <QueryProvider>
      <AuthenticateProvider>{children}</AuthenticateProvider>
    </QueryProvider>
  );
}
