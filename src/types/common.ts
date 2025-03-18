import { SettingsFormData } from "@/lib";

export interface LayoutProps
  extends Readonly<{
    children: React.ReactNode;
  }> {}

export interface AppSidebarProps {
  userType: "manager" | "tenant";
}

export interface SettingsFormProps {
  initialData: SettingsFormData;
  onSubmit: (data: SettingsFormData) => Promise<void>;
  userType: "manager" | "tenant";
}
