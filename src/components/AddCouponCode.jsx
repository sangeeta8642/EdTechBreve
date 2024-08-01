
//Component to add the coupon code in the firebase database
import React, { useState } from 'react';
import { db } from '../server/firebase';
import { collection, addDoc } from 'firebase/firestore';


//funtion to add the coupon code
const AddCouponCode = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await addDoc(collection(db, 'coupons'), {
        code: code.toUpperCase(), 
        discount: parseFloat(discount), 
        expiration: new Date(expiration), 
      });
      alert('Coupon added successfully');
      setCode('');
      setDiscount('');
      setExpiration('');
    } catch (error) {
      console.error('Error adding coupon: ', error);
    }
  };

  return (
    //form to accept the coupon code
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add Coupon Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Coupon Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter coupon code"
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Discount Percentage</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount percentage"
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Expiration Date</label>
          <input
            type="date"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCouponCode;
