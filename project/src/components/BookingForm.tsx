import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import VehicleSelector from './VehicleSelector';
import { Calendar, Clock, IndianRupee } from 'lucide-react';

const BookingForm: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { selectedLocation, setBookingDetails, bookingDetails } = useBooking();
  
  const [vehicleType, setVehicleType] = useState(bookingDetails?.vehicleType || 'sedan');
  const [vehicleNumber, setVehicleNumber] = useState(bookingDetails?.vehicleNumber || '');
  const [date, setDate] = useState<string>(
    bookingDetails?.startTime 
      ? new Date(bookingDetails.startTime).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState<string>(
    bookingDetails?.startTime 
      ? new Date(bookingDetails.startTime).toTimeString().slice(0, 5)
      : new Date().toTimeString().slice(0, 5)
  );
  const [duration, setDuration] = useState<number>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!selectedLocation) {
      navigate('/');
    }
  }, [selectedLocation, navigate]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Validate vehicle number (format: TN 01 AB 1234)
    const vehicleRegex = /^[A-Z]{2}\s\d{2}\s[A-Z]{1,2}\s\d{1,4}$/;
    if (!vehicleNumber) {
      newErrors.vehicleNumber = 'Vehicle number is required';
    } else if (!vehicleRegex.test(vehicleNumber)) {
      newErrors.vehicleNumber = 'Invalid format. Use: TN 01 AB 1234';
    }
    
    // Validate date & time
    const selectedDateTime = new Date(`${date}T${startTime}`);
    if (selectedDateTime < new Date()) {
      newErrors.time = 'Selected time cannot be in the past';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + duration);
    
    setBookingDetails({
      userId: user?.id || 'guest',
      locationId: selectedLocation?.id || '',
      vehicleType,
      vehicleNumber,
      startTime: startDateTime,
      endTime: endDateTime,
      status: 'pending',
    });
    
    navigate('/payment');
  };

  if (!selectedLocation) return null;

  const hourlyRate = selectedLocation.rate.hourly;
  const totalAmount = hourlyRate * duration;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Parking Space</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Selected Location</h3>
        <p className="text-lg font-semibold text-gray-800">{selectedLocation.name}</p>
        <p className="text-gray-600 text-sm">{selectedLocation.address}</p>
        <div className="mt-2 text-blue-600 text-sm">
          <span className="font-medium">{selectedLocation.availableSlots}</span> out of <span>{selectedLocation.totalSlots}</span> slots available
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <VehicleSelector selectedVehicle={vehicleType} onChange={setVehicleType} />
        
        <div>
          <label htmlFor="vehicleNumber" className="block text-gray-700 font-medium mb-2">
            Vehicle Number
          </label>
          <input
            type="text"
            id="vehicleNumber"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
            placeholder="TN 01 AB 1234"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.vehicleNumber
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {errors.vehicleNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.vehicleNumber}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">Format: TN 01 AB 1234</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </div>
            </label>
            <input
              type="date"
              id="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Start Time</span>
              </div>
            </label>
            <input
              type="time"
              id="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.time
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">
            Duration (Hours)
          </label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {[1, 2, 3, 4, 5, 6, 12, 24].map((hour) => (
              <option key={hour} value={hour}>
                {hour} {hour === 1 ? 'hour' : 'hours'}
              </option>
            ))}
          </select>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Rate per hour</span>
            <div className="flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              <span>{hourlyRate.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Duration</span>
            <span>{duration} {duration === 1 ? 'hour' : 'hours'}</span>
          </div>
          
          <div className="border-t border-gray-200 my-2 pt-2"></div>
          
          <div className="flex justify-between items-center font-bold">
            <span className="text-gray-800">Total Amount</span>
            <div className="flex items-center text-lg text-blue-800">
              <IndianRupee className="h-5 w-5 mr-1" />
              <span>{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {!isAuthenticated && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You're not logged in. Consider{' '}
                  <a href="/login" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                    logging in
                  </a>
                  {' '}to manage your bookings.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;