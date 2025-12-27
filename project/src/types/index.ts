export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  totalSlots: number;
  availableSlots: number;
  rate: {
    hourly: number;
    daily: number;
  };
}

export interface VehicleType {
  id: string;
  name: string;
  icon: string;
  priceMultiplier: number;
}

export interface Booking {
  id: string;
  userId: string;
  locationId: string;
  vehicleType: string;
  vehicleNumber: string;
  startTime: Date;
  endTime: Date;
  slotNumber: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface PaymentInfo {
  method: 'upi' | 'card';
  upiId?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardName?: string;
}