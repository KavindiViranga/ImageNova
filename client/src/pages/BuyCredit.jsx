/*import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios'

const BuyCredit = () => {


  const {user, backendUrl, localCreditsData, token, setShowLogin} = useContext(AppContext)

  const navigate = useNavigate()

  const initPay =  async (order)=>{
    const options = {
      key: import.meta.env.VITE_PAYPAL_CLIENT_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response)=>{
        console.log(response);
      }
    }
    const pal = new window.Paypalpay(options)
    pal.open()
  }
  const paymentPal = async (planId)=>{
    try{
      if(!user){
        setShowLogin(true)
      }

      const {data} = await axios.post(backendUrl + '/api/user/pay-paypal', {planId}, {headers: {token}})
    
      if(data.success){
        initPay(data.order)
      }
    }catch(error){
      toast.error(error.message)
    }
  }
  return (
    <motion.div 
    
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index)=>(
          <div key={index}
          className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 
          text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={40} src={assets.logo_icon} alt=''></img>
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price} </span>/ 
              {item.credits} credits</p>
              <button onClick={()=>paymentPal(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm 
              rounded-md py-2.5 min-w-52'>{user ? 'Purchase'
              :'Get Started'}</button>
          </div>
        ))}

      </div>
    </motion.div>
  )
}

export default BuyCredit*/

/*import React, { useContext, useState } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const BuyCredit = () => {
  const { user, backendUrl, token, setShowLogin } = useContext(AppContext);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const createOrder = async (planId) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const { data } = await axios.post(
      `${backendUrl}/api/user/pay-paypal`,
      {
        planId,
        userId: user._id,
      },
      {
        headers: { token },
      }
    );

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    setTransactionId(data.transactionId);
    return data.orderId;
  };

  const captureOrder = async (orderID) => {
    const { data } = await axios.post(
      `${backendUrl}/api/user/paypal/capture`,
      {
        orderId: orderID,
        transactionId,
      },
      {
        headers: { token },
      }
    );

    if (data.success) {
      toast.success("Payment successful 🎉 Credits added!");
    } else {
      toast.error("Payment failed");
    }
  };

  return (
    <PayPalScriptProvider
      options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="min-h-[80vh] text-center pt-14 mb-10"
      >
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
          Our Plans
        </button>

        <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
          Choose the plan
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-left">
          {plans.map((item, index) => (
            <div
              key={index}
              className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 
              text-gray-600 hover:scale-105 transition-all duration-500"
            >
              <img width={40} src={assets.logo_icon} alt="" />

              <p className="mt-3 mb-1 font-semibold">{item.id}</p>
              <p className="text-sm">{item.desc}</p>

              <p className="mt-6">
                <span className="text-3xl font-medium">${item.price}</span> /{" "}
                {item.credits} credits
              </p>

              <button
                onClick={() => setSelectedPlan(item.id)}
                className="w-full bg-gray-800 text-white mt-8 text-sm 
                rounded-md py-2.5 min-w-52"
              >
                {user ? "Purchase" : "Get Started"}
              </button>

              {selectedPlan === item.id && (
                <div className="mt-6">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={() => createOrder(item.id)}
                    onApprove={(data) => captureOrder(data.orderID)}
                    onError={() => toast.error("PayPal error")}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
};

export default BuyCredit;*/

import React, { useContext, useState } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  /* ================= CREATE PAYPAL ORDER ================= */
  const createOrder = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/create-paypal-order",
        { planId: selectedPlan },
        {
          headers: {
            token: token,
          },
        }
      );

      if (!data.success) {
        toast.error("Unable to create PayPal order");
        return;
      }

      setTransactionId(data.transactionId);
      return data.orderId;
    } catch {
      toast.error("PayPal order creation failed");
    }
  };

  /* ================= CAPTURE PAYPAL ORDER ================= */
  const onApprove = async (data) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/user/capture-paypal-order",
        {
          orderId: data.orderID,
          transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Credits added successfully 🎉");
        navigate("/");
      } else {
        toast.error("Payment not completed");
      }
    } catch {
      toast.error("Payment capture failed");
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="min-h-[80vh] text-center pt-14 mb-10"
      >
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
          Our Plans
        </button>

        <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
          Choose the plan
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-left">
          {plans.map((item, index) => (
            <div
              key={index}
              className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 
              text-gray-600 hover:scale-105 transition-all duration-500"
            >
              <img width={40} src={assets.logo_icon} alt="" />
              <p className="mt-3 mb-1 font-semibold">{item.id}</p>
              <p className="text-sm">{item.desc}</p>
              <p className="mt-6">
                <span className="text-3xl font-medium">${item.price}</span> /{" "}
                {item.credits} credits
              </p>

              {!user ? (
                <button
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-gray-800 text-white mt-8 text-sm 
                  rounded-md py-2.5 min-w-52"
                >
                  Get Started
                </button>
              ) : selectedPlan === item.id ? (
                <div className="mt-8">
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={() =>
                      toast.error("PayPal payment failed")
                    }
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSelectedPlan(item.id)}
                  className="w-full bg-gray-800 text-white mt-8 text-sm 
                  rounded-md py-2.5 min-w-52"
                >
                  Purchase
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
};

export default BuyCredit;
