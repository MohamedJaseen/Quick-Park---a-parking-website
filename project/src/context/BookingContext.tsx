import React, { createContext, useContext, useState } from 'react';
import { Booking, Location, PaymentInfo } from '../types';
import { locations } from '../data/locations';

interface BookingContextType {
  selectedLocation: Location | null;
  bookingDetails: Partial<Booking> | null;
  paymentInfo: Partial<PaymentInfo> | null;
  completedBookings: Booking[];
  setSelectedLocation: (location: Location | null) => void;
  setBookingDetails: (details: Partial<Booking>) => void;
  setPaymentInfo: (info: Partial<PaymentInfo>) => void;
  completeBooking: () => Booking | null;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [bookingDetails, setBookingDetails] = useState<Partial<Booking> | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<Partial<PaymentInfo> | null>(null);
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);

  const completeBooking = (): Booking | null => {
    if (!selectedLocation || !bookingDetails || !paymentInfo) {
      return null;
    }

    // Generate a random slot number based on location
    const slotNumber = `${selectedLocation.name.charAt(0)}${Math.floor(Math.random() * 100)}`;
    
    // Calculate amount (in a real app, this would be more complex)
    const hourlyRate = selectedLocation.rate.hourly;
    const hours = bookingDetails.startTime && bookingDetails.endTime
      ? Math.ceil((bookingDetails.endTime.getTime() - bookingDetails.startTime.getTime()) / (1000 * 60 * 60))
      : 1;
    
    const amount = hourlyRate * hours;

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: bookingDetails.userId || 'guest',
      locationId: selectedLocation.id,
      vehicleType: bookingDetails.vehicleType || 'sedan',
      vehicleNumber: bookingDetails.vehicleNumber || '',
      startTime: bookingDetails.startTime || new Date(),
      endTime: bookingDetails.endTime || new Date(Date.now() + 3600000),
      slotNumber,
      amount,
      status: 'confirmed',
    };

    // Update the available slots for the selected location
    const updatedLocations = locations.map(loc => {
      if (loc.id === selectedLocation.id) {
        return {
          ...loc,
          availableSlots: loc.availableSlots - 1
        };
      }
      return loc;
    });

    // In a real app, you would update this in the database

    setCompletedBookings([...completedBookings, newBooking]);
    return newBooking;
  };

  const clearBooking = () => {
    setSelectedLocation(null);
    setBookingDetails(null);
    setPaymentInfo(null);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedLocation,
        bookingDetails,
        paymentInfo,
        completedBookings,
        setSelectedLocation,
        setBookingDetails,
        setPaymentInfo,
        completeBooking,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};