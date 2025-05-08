import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../utils/stripe';
import PaymentForm from '../../components/Payement/PaymentForm';

const PaymentPage = ({ amount }) => {
  return (
    <div className="payment-page">
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <PaymentForm amount={amount} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
