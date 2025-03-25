import { SettingsFormData } from "@/lib";
import { Property } from "./prismaTypes";

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

export interface CardProps {
  property: Property;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  showFavoriteButton?: boolean;
  propertyLink?: string;
}
