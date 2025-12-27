import { VehicleType } from '../types';
import { Car, Truck, Sun as Suv, Soup as Coupe, SlackIcon as HatchbackIcon } from 'lucide-react';

export const vehicleTypes: VehicleType[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    icon: 'Car',
    priceMultiplier: 1.0,
  },
  {
    id: 'hatchback',
    name: 'Hatchback',
    icon: 'HatchbackIcon',
    priceMultiplier: 0.9,
  },
  {
    id: 'suv',
    name: 'SUV',
    icon: 'Suv',
    priceMultiplier: 1.2,
  },
  {
    id: 'van',
    name: 'Van',
    icon: 'Truck',
    priceMultiplier: 1.3,
  },
  {
    id: 'coupe',
    name: 'Coupe',
    icon: 'Coupe',
    priceMultiplier: 1.1,
  },
];

export const getVehicleIcon = (id: string) => {
  switch (id) {
    case 'sedan':
      return Car;
    case 'hatchback':
      return HatchbackIcon;
    case 'suv':
      return Suv;
    case 'van':
      return Truck;
    case 'coupe':
      return Coupe;
    default:
      return Car;
  }
};