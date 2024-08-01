// //Pay with Paypal
import React from 'react';
import axios from 'axios';

const PayPalButton = ({amount}) => {
  const [paymentId, setPaymentId] = React.useState(null);
  const [payerId, setPayerId] = React.useState(null);

  const handlePayment = async () => {
    try {
      // Request an access token
      const tokenResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 
        'grant_type=client_credentials', 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: 'AXZQLjA_3wIAn7mFP7BIlHLsjowyu0TL31inCkt0XSafQTEca-AQ6GUnlEn6XVYWX-sQ_WgKR2Di14OL',
            password: 'EBG38_32IFq3ypA8mHCcysBYayYtswN3VEW-YPGFGgebcmqiQlrLYo06_voSqpiPRPnnEsyfz00T8aLz',
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Create Payment
      const paymentResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/payments/payment', 
        {
          intent: 'sale',
          redirect_urls: {
            return_url: `${window.location.origin}/success`,
            cancel_url: `${window.location.origin}/cancel`,
          },
          payer: {
            payment_method: 'paypal',
          },
          transactions: [{
            amount: {
              total: amount,
              currency: 'USD',
            },
            description: 'Test transaction',
          }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );

      const { id, links } = paymentResponse.data;
      setPaymentId(id);

      // Redirect user to PayPal for approval
      const approvalUrl = links.find(link => link.rel === 'approval_url').href;
      window.location.href = approvalUrl;

    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  const handleSuccess = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const payerId = queryParams.get('PayerID');
      const paymentId = queryParams.get('paymentId');

      if (!payerId || !paymentId) return;

      // Request an access token
      const tokenResponse = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', 
        'grant_type=client_credentials', 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: 'AXZQLjA_3wIAn7mFP7BIlHLsjowyu0TL31inCkt0XSafQTEca-AQ6GUnlEn6XVYWX-sQ_WgKR2Di14OL',
            password: 'EBG38_32IFq3ypA8mHCcysBYayYtswN3VEW-YPGFGgebcmqiQlrLYo06_voSqpiPRPnnEsyfz00T8aLz',
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Execute Payment
      await axios.post(`https://api-m.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, 
        { payer_id: payerId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );

      console.log('Payment executed successfully');
      
    } catch (error) {
      console.error('Execution failed', error);
    }
  };

  // Handle the success callback
  React.useEffect(() => {
    if (window.location.pathname === '/success') {
      handleSuccess();
    }
  }, []);

  return (
    <button onClick={handlePayment} className='italic'>Pay with PayPal</button>
  );
};

export default PayPalButton;
