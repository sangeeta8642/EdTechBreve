//component to fetch,validate and apply the coupon code
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../server/firebase';

//function to fetch the coupon code from DB
export const fetchCoupon = async (code) => {
  const couponsRef = collection(db, 'coupons');
  const q = query(couponsRef, where('code', '==', code.toUpperCase()));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const coupon = querySnapshot.docs[0].data();
    return coupon;
  } else {
    throw new Error('Invalid coupon code');
  }
};

//function to validate the coupon code
export const validateCoupon = (coupon) => {
  const now = new Date();
  if (coupon.expiration.toDate() >= now) {
    alert("Coupon applied..!!")
    return true;
  } else {
    throw new Error('Coupon has expired');
  }
};

//function to apply coupon discount on the product
export const applyDiscount = (originalAmount, discountPercentage) => {
  return originalAmount - (originalAmount * discountPercentage / 100);
};
