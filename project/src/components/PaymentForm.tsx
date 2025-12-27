import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { IndianRupee, CreditCard, QrCode } from 'lucide-react';

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();
  const { selectedLocation, bookingDetails, setPaymentInfo, completeBooking } = useBooking();
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  
  useEffect(() => {
    if (!selectedLocation || !bookingDetails) {
      navigate('/book');
    }
  }, [selectedLocation, bookingDetails, navigate]);
  
  if (!selectedLocation || !bookingDetails) return null;
  
  const hourlyRate = selectedLocation.rate.hourly;
  const startTime = bookingDetails.startTime as Date;
  const endTime = bookingDetails.endTime as Date;
  const hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
  const totalAmount = hourlyRate * hours;
  
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (paymentMethod === 'upi') {
      const upiRegex = /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/;
      if (!upiId) {
        newErrors.upiId = 'UPI ID is required';
      } else if (!upiRegex.test(upiId)) {
        newErrors.upiId = 'Invalid UPI ID format';
      }
    } else {
      // Validate card details
      if (!cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number format';
      }
      
      if (!cardName) {
        newErrors.cardName = 'Name on card is required';
      }
      
      if (!cardExpiry) {
        newErrors.cardExpiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        newErrors.cardExpiry = 'Invalid format (MM/YY)';
      }
      
      if (!cardCvv) {
        newErrors.cardCvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cardCvv)) {
        newErrors.cardCvv = 'Invalid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, this would be an API call to process payment
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Set payment info based on method
      if (paymentMethod === 'upi') {
        setPaymentInfo({ method: 'upi', upiId });
      } else {
        setPaymentInfo({
          method: 'card',
          cardNumber: cardNumber.replace(/\s/g, ''),
          cardName,
          cardExpiry,
          cardCvv,
        });
      }
      
      // Complete the booking
      const booking = completeBooking();
      if (booking) {
        setConfirmedBooking(booking);
        setShowBookingConfirmation(true);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setErrors({ 
        general: 'Payment processing failed. Please try again.' 
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCloseConfirmation = () => {
    setShowBookingConfirmation(false);
    navigate('/');
  };
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
      
      {/* Booking Summary */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Booking Summary</h3>
        <p className="font-semibold text-gray-800">{selectedLocation.name}</p>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Vehicle Type</span>
            <span className="font-medium text-gray-800">{bookingDetails.vehicleType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Vehicle Number</span>
            <span className="font-medium text-gray-800">{bookingDetails.vehicleNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Start Time</span>
            <span className="font-medium text-gray-800">
              {startTime.toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">End Time</span>
            <span className="font-medium text-gray-800">
              {endTime.toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium text-gray-800">
              {hours} {hours === 1 ? 'hour' : 'hours'}
            </span>
          </div>
          <div className="pt-2 mt-2 border-t border-blue-100 flex justify-between items-center">
            <span className="font-medium text-gray-800">Total Amount</span>
            <div className="flex items-center text-blue-800 font-bold">
              <IndianRupee className="h-4 w-4 mr-1" />
              <span>{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selector */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('upi')}
            className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 ${
              paymentMethod === 'upi'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <QrCode className={`h-5 w-5 ${paymentMethod === 'upi' ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className={`font-medium ${paymentMethod === 'upi' ? 'text-blue-800' : 'text-gray-700'}`}>
              UPI Payment
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 ${
              paymentMethod === 'card'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <CreditCard className={`h-5 w-5 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className={`font-medium ${paymentMethod === 'card' ? 'text-blue-800' : 'text-gray-700'}`}>
              Card Payment
            </span>
          </button>
        </div>
        
        {/* UPI Payment Section */}
        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="upiId" className="block text-gray-700 font-medium mb-2">
                Enter UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@upi"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.upiId
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.upiId && (
                <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Example: yourname@okicici or yourname@ybl
              </p>
            </div>
          </div>
        )}
        
        {/* Card Payment Section */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.cardNumber
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="cardName" className="block text-gray-700 font-medium mb-2">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.cardName
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {errors.cardName && (
                <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cardExpiry" className="block text-gray-700 font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="cardExpiry"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cardExpiry
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                />
                {errors.cardExpiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="cardCvv" className="block text-gray-700 font-medium mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  id="cardCvv"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength={4}
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.cardCvv
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-blue-200'
                  }`}
                />
                {errors.cardCvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardCvv}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {errors.general && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{errors.general}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-3 rounded-md font-medium text-white transition-colors ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </span>
          ) : (
            `Pay ₹${totalAmount.toFixed(2)}`
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Your payment information is processed securely. We do not store your card details.
        </p>
      </form>
      
      {/* Booking Confirmation Popup */}
      {showBookingConfirmation && confirmedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h3>
              <p className="text-gray-600 mt-2">Your parking slot has been reserved successfully.</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="text-center mb-3">
                <span className="text-sm font-medium text-blue-700">Your Slot Number</span>
                <div className="text-3xl font-bold text-blue-900 mt-1">{confirmedBooking.slotNumber}</div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-800">{selectedLocation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-medium text-gray-800">
                    {confirmedBooking.vehicleType} ({confirmedBooking.vehicleNumber})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-800">
                    {hours} {hours === 1 ? 'hour' : 'hours'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-blue-100">
                  <span className="text-gray-700">Amount Paid</span>
                  <div className="flex items-center font-bold text-blue-800">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    <span>{confirmedBooking.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                A confirmation has been sent to your email. Please show your slot number at the entrance.
              </p>
              <button
                onClick={handleCloseConfirmation}
                className="px-6 py-2 bg-blue-800 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;