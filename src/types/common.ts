export interface LayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {}

export interface AppSidebarProps {
  userType: "manager" | "tenant";
}
