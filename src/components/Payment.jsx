//payment section
import React, { useState } from "react";
import PayWithPayPal from "../Paymentmethods/PayWithPayPal";
import PayWithStripe from "../Paymentmethods/PayWithStripe";
import { fetchCoupon, validateCoupon, applyDiscount } from "./couponUtils";

const Payment = ({setPayments }) => {
  const [coupon, setCoupon] = useState(false);
  const [amount, setAmount] = useState(20);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleCouponApply = async () => {
    if (isCouponApplied) {
      setError("Coupon has already been applied.");
      return;
    }

    try {
      setError("");
      if (couponCode) {
        const coupon = await fetchCoupon(couponCode);
        validateCoupon(coupon);
        const newAmount = applyDiscount(amount, coupon.discount);
        setAmount(newAmount);
        setIsCouponApplied(true); 
      } else {
        setError("Please enter a valid coupon code.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-[40%] bg-slate-100 rounded-xl border-2 border-black absolute backdrop:brightness-75 flex gap-6 flex-col p-10 capitalize">
      <div>
        <svg
          className="cursor-pointer"
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 1024 1024"
          height="2em"
          width="2em"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setPayments(false)}
        >
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
        </svg>
        <p className="text-center text-3xl font-sans">Payment</p>
      </div>
      <p className="text-xl">price : $ {amount}</p>
      {isCouponApplied ? (
        <p className="text-xl text-slate-800 font-light">
          you got 15% discount using coupon code
        </p>
      ) : (
        <p className="text-xl text-slate-800 font-light">
          get upto 15% discount using coupon code
        </p>
      )}
      {coupon ? (
        <p
          className="hover:text-blue-700 cursor-pointer w-[max-content] font-semibold"
          onClick={() => setCoupon(!coupon)}
        >
          I Don't have a Coupon code
        </p>
      ) : (
        <p
          className="hover:text-blue-700 cursor-pointer w-[max-content] font-semibold"
          onClick={() => setCoupon(!coupon)}
        >
          shop with Coupon code
        </p>
      )}
      {coupon ? (
        <>
          <div className="flex gap-5 items-center">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="h-16 pl-5 border-4 border-black text-xl rounded-lg"
            />
            <button
              onClick={handleCouponApply}
              disabled={isCouponApplied}
              className="bg-red-500 h-10 w-36 text-white rounded-lg"
            >
              {isCouponApplied ? "Couple Applied...!!" : "Apply Coupon"}
            </button>
          </div>
        </>
      ) : null}
      <button
        className="bg-yellow-600 h-14 rounded-full text-white text-2xl italic font-semibold hover:bg-white hover:text-yellow-600 hover:border-2 hover:border-yellow-600"
        type="button"
      >
        <PayWithPayPal amount={amount} />
      </button>
      <div>
        <PayWithStripe
          amount={amount}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Payment;
