import { LayoutProps } from "@/types";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

export default function RootLayout({ children }: LayoutProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
