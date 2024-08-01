//Pay with Stripe
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PgA8B2Ny1hH9rMOtpJehsn4t9co11VxL3po9Xli4TRTXO2677L1Edt6LMk2be2Af60Sohz0uzhHgumNBagYC5EO00JzADife5'); // Replace with your publishable key

const PayWithStripe = ({ amount }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      // Create a Checkout Session using Stripe's API
      const response = await axios.post('https://api.stripe.com/v1/checkout/sessions', new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': 'Test Product',
        'line_items[0][price_data][unit_amount]': (amount * 100), // Convert amount to cents
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': `${window.location.origin}/success`,
        'cancel_url': `${window.location.origin}/cancel`,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer sk_test_51PgA8B2Ny1hH9rMO2jk2Dj2Kvbb2CPGTUiS4kvZC0vR4Oh9XMZAevIjWv19MFbwcl3JgtUoea4Jg5PAEHCNzuZJO00SgVeMs8w` // Replace with your secret key (INSECURE)
        }
      });

      const { id } = response.data;

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error('Error redirecting to Checkout:', error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        className="bg-green-600 w-full h-14 rounded-full text-white text-2xl italic font-semibold hover:bg-white hover:text-green-600 hover:border-2 hover:border-green-600"
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default PayWithStripe;
