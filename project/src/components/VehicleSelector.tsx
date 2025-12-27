import React from 'react';
import { vehicleTypes, getVehicleIcon } from '../data/vehicleTypes';

interface VehicleSelectorProps {
  selectedVehicle: string;
  onChange: (vehicleType: string) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ selectedVehicle, onChange }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Select Vehicle Type</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {vehicleTypes.map((vehicle) => {
          const IconComponent = getVehicleIcon(vehicle.id);
          const isSelected = vehicle.id === selectedVehicle;
          
          return (
            <button
              key={vehicle.id}
              onClick={() => onChange(vehicle.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <IconComponent
                className={`h-10 w-10 mb-2 ${
                  isSelected ? 'text-blue-700' : 'text-gray-600'
                }`}
              />
              <span className={`text-sm font-medium ${
                isSelected ? 'text-blue-800' : 'text-gray-700'
              }`}>
                {vehicle.name}
              </span>
              {isSelected && (
                <div className="w-2 h-2 bg-blue-700 rounded-full mt-2"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleSelector;