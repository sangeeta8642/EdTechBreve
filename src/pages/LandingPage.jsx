import { useState } from "react";
import shoe from "../assets/shoe.png";
import Navbar from "../components/Navbar";
import Payment from "../components/Payment";

function LandingPage() {
  const [payments, setPayments] = useState(false);

  return (
    <main className="sm:mt-[400px] lg:mt-[100px] md:mt-[400px] sm:mb-24 mt-[450px] flex flex-col justify-center items-center">
      <Navbar />
      <div className="container mx-auto p-4 flex justify-center items-center flex-col relative">
        <h1 className="lg:text-7xl lg:text-black lg:bg-none md:text-black md:text-4xl sm:text-black sm:text-4xl text-3xl font-bold">
          Welcome to the EdTech Platform
        </h1>

        <div className="mt-8 flex lg:flex-row md:flex-col sm:flex-col-reverse flex-col-reverse">
          <div className="product-img">
            <img
              src={shoe}
              alt="Air Nike Pegasus 41 Electric"
              height="420"
              width="400"
            />
          </div>
          <div className="product-info mt-7 flex flex-col gap-5">
            <div className="product-text">
              <h2 className="text-2xl font-bold">
                Air Nike Pegasus 41 Electric
              </h2>
              <h3 className="capitalize text-xl text-slate-500 font-semibold">
                meet the next generation of Air{" "}
              </h3>
            </div>
            <p className="text-xl text-slate-500 font-bold"> Price : $20</p>

            <button
              className="bg-black h-14 rounded-full text-white text-2xl italic font-semibold hover:bg-white hover:text-black hover:border-2 hover:border-black"
              type="button"
              onClick={() => setPayments(!payments)}
            >
              Check out
            </button>
          </div>
        </div>
      </div>
      {payments ? (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md backdrop-brightness-75 flex justify-center items-center z-50 overflow-y-scroll">
          <Payment
            setPayments={setPayments}
          />
        </div>
      ) : null}
    </main>
  );
}

export default LandingPage;
