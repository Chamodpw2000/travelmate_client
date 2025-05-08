import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>Your booking has been confirmed.</p>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default PaymentSuccess;
