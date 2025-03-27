import {
  Bath,
  Building,
  Bus,
  Cable,
  Car,
  Castle,
  Cigarette,
  Dumbbell,
  Hammer,
  Home,
  Landmark,
  LucideIcon,
  Maximize,
  Mountain,
  PawPrint,
  Phone,
  Sprout,
  Thermometer,
  Trees,
  Tv,
  VolumeX,
  Warehouse,
  Waves,
  Wifi,
} from "lucide-react";

export const NAVBAR_HEIGHT = 52;

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Landmark,
  Cottage: Trees,
};

export enum AmenityEnum {
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Dishwasher = "Dishwasher",
  HighSpeedInternet = "HighSpeedInternet",
  HardwoodFloors = "HardwoodFloors",
  WalkInClosets = "WalkInClosets",
  Microwave = "Microwave",
  Refrigerator = "Refrigerator",
  Pool = "Pool",
  Gym = "Gym",
  Parking = "Parking",
  PetsAllowed = "PetsAllowed",
  WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Dishwasher: Waves,
  HighSpeedInternet: Wifi,
  HardwoodFloors: Home,
  WalkInClosets: Maximize,
  Microwave: Tv,
  Refrigerator: Thermometer,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  PetsAllowed: PawPrint,
  WiFi: Wifi,
};

export enum HighlightEnum {
  HighSpeedInternetAccess = "HighSpeedInternetAccess",
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Heating = "Heating",
  SmokeFree = "SmokeFree",
  CableReady = "CableReady",
  SatelliteTV = "SatelliteTV",
  DoubleVanities = "DoubleVanities",
  TubShower = "TubShower",
  Intercom = "Intercom",
  SprinklerSystem = "SprinklerSystem",
  RecentlyRenovated = "RecentlyRenovated",
  CloseToTransit = "CloseToTransit",
  GreatView = "GreatView",
  QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  HighSpeedInternetAccess: Wifi,
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Heating: Thermometer,
  SmokeFree: Cigarette,
  CableReady: Cable,
  SatelliteTV: Tv,
  DoubleVanities: Maximize,
  TubShower: Bath,
  Intercom: Phone,
  SprinklerSystem: Sprout,
  RecentlyRenovated: Hammer,
  CloseToTransit: Bus,
  GreatView: Mountain,
  QuietNeighborhood: VolumeX,
};
