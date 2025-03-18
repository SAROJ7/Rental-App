import { LayoutProps } from "@/types";
import { QueryProvider } from "@/providers/query-provider";
import AuthenticateProvider from "@/providers/authenticate-provider";
import "./globals.css";
import { AxiosProvider } from "@/providers";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <QueryProvider>
      <AuthenticateProvider>
        <AxiosProvider>
          {children}
          <Toaster richColors />
        </AxiosProvider>
      </AuthenticateProvider>
    </QueryProvider>
  );
}
