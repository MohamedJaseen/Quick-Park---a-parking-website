import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Location } from '../types';
import { MapPin, Clock, IndianRupee } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const navigate = useNavigate();
  const { setSelectedLocation } = useBooking();
  
  const availabilityPercentage = (location.availableSlots / location.totalSlots) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage > 50) return 'bg-green-500';
    if (availabilityPercentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleBookNow = () => {
    setSelectedLocation(location);
    navigate('/book');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
        
        <div className="flex items-start space-x-2 text-gray-600 mb-2">
          <MapPin className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{location.address}</p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4 text-blue-700" />
            <span className="font-semibold text-gray-800">{location.rate.hourly}</span>
            <span className="text-gray-600 text-sm">/hour</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-blue-700" />
            <span className="text-gray-600 text-sm">24/7 Access</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div 
              className={`h-2 rounded-full ${getAvailabilityColor()}`} 
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>
              {location.availableSlots}/{location.totalSlots} slots
            </span>
            {availabilityPercentage <= 20 && <span className="text-red-500 font-medium">Filling fast!</span>}
          </div>
        </div>
        
        <button
          onClick={handleBookNow}
          disabled={location.availableSlots === 0}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            location.availableSlots === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-800 text-white hover:bg-blue-700'
          }`}
        >
          {location.availableSlots === 0 ? 'Fully Booked' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default LocationCard