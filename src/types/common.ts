import { SettingsFormData } from "@/lib";
import { Application, Lease, Payment, Property } from "./prismaTypes";

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

export interface ImagePreviewsProps {
  images: string[];
}

export interface PropertyOverviewProps {
  propertyId: number;
}

export interface PropertyDetailsProps {
  propertyId: number;
}

export interface PropertyLocationProps {
  propertyId: number;
}

export interface ContactWidgetProps {
  onOpenModal: () => void;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
}

export interface ResidenceCardProps {
  property: Property;
  currentLease: Lease;
}

export interface PaymentMethodProps {}

export interface BillingHistoryProps {
  payments: Payment[];
}

export interface ApplicationCardProps {
  application: Application;
  userType: "manager" | "renter";
  children: React.ReactNode;
}

export interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
}
