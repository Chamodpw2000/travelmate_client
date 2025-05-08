import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Payement/PaymentForm.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data } = await axios.post('/api/payment/create-payment-intent', {
        amount,
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: 'Customer Name', 
            },
          },
        }
      );

      if (error) {
        setError(error.message);
        navigate('/payment-failed');
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setTimeout(() => {
          navigate('/payment-success');
        }, 1000);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during payment.');
      navigate('/payment-failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-row">
          <label htmlFor="card-element">Credit or debit card</label>
          <div className="card-element-container">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            Payment successful! Redirecting...
          </div>
        )}

        <button 
          className="payment-button"
          disabled={!stripe || processing || success}
        >
          {processing ? (
            <span className="spinner">Processing...</span>
          ) : (
            `Pay $${amount}`
          )}
        </button>
      </form>

      
    </div>
  );
};

export default PaymentForm;
