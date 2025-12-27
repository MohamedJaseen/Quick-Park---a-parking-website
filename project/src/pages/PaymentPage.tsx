import React from 'react';
import PaymentForm from '../components/PaymentForm';

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;