/*import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transactionModel from "../models/transactionModel.js";
import paypalClient from "../config/paypal.js";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const registerUser =  async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({ success:false, message: 'Missing Details' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, 
            email, 
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token, user: {name: user.name}})

    } catch (error){
        console.log(error)
        res.json({success:false, message: error.message})
    }

}


const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

            res.json({success: true, token, user: {name: user.name}})

        }else{
            return res.json({success:false, message: 'Invalid credentials'})
        }

    }catch(error){
        console.log(error)
        res.json({success:false, message: error.message})
    }

}

const userCredits = async (req, res)=>{
    try {
        const {userId} = req.body

        const user = await userModel.findById(userId)
        res.json({success: true, credits: user.creditBalance, user:
        {name: user.name}})

    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message })
    }
}*/

/* ================= PAYPAL CREATE ORDER ================= */
/*const createPaypalOrder = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        credits = 100;
        amount = "10.00";
        plan = "Basic";
        break;
      case "Advanced":
        credits = 500;
        amount = "50.00";
        plan = "Advanced";
        break;
      case "Business":
        credits = 5000;
        amount = "250.00";
        plan = "Business";
        break;
      default:
        return res.json({ success: false, message: "Invalid plan" });
    }
    date: Date.now()

    const transaction = await transactionModel.create({
      userId,
      plan,
      amount,
      credits,
      status: "PENDING",
    });

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount
          }
        }
      ]
    });

    const order = await paypalClient.execute(request);

    res.json({
      success: true,
      orderId: order.result.id,
      transactionId: transaction._id
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const capturePaypalOrder = async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;

    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await paypalClient.execute(request);

    if (capture.result.status === "COMPLETED") {
      const transaction = await transactionModel.findById(transactionId);

      await userModel.findByIdAndUpdate(transaction.userId, {
        $inc: { creditBalance: transaction.credits }
      });

      transaction.status = "COMPLETED";
      await transaction.save();

      return res.json({ success: true });
    }

    res.json({ success: false, message: "Payment not completed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};*/

/* ================= EXPORTS ================= */
/*export {
  registerUser,
  loginUser,
  userCredits,
  createPaypalOrder,
  capturePaypalOrder
};*/


import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transactionModel from "../models/transactionModel.js";
import paypalClient from "../config/paypal.js";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

/* ================= REGISTER ================= */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= LOGIN ================= */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= USER CREDITS ================= */
const userCredits = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await userModel.findById(userId);

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= PAYPAL CREATE ORDER ================= */
const createPaypalOrder = async (req, res) => {
  try {
    const { planId, userId } = req.body;
    
    if (!planId) {
      return res.json({ success: false, message: "Missing plan" });
    }

    let credits, plan, amount;

    switch (planId) {
      case "Basic":
        credits = 100;
        amount = "10.00";
        plan = "Basic";
        break;
      case "Advanced":
        credits = 500;
        amount = "50.00";
        plan = "Advanced";
        break;
      case "Business":
        credits = 5000;
        amount = "250.00";
        plan = "Business";
        break;
      default:
        return res.json({ success: false, message: "Invalid plan" });
    }

    const transaction = await transactionModel.create({
      userId,
      plan,
      amount,
      credits,
      status: "PENDING",
      date: Date.now()
    });

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount
          }
        }
      ]
    });

    const order = await paypalClient.execute(request);

    res.json({
      success: true,
      orderId: order.result.id,
      transactionId: transaction._id
    });
  } catch (error) {
    console.error("PAYPAL CREATE ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= PAYPAL CAPTURE ================= */
const capturePaypalOrder = async (req, res) => {
  try {
    const { orderId, transactionId } = req.body;

    const transaction = await transactionModel.findById(transactionId);
    if (!transaction) {
      return res.json({ success: false, message: "Transaction not found" });
    }

    const request =
      new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await paypalClient.execute(request);

    if (capture.result.status === "COMPLETED") {
      await userModel.findByIdAndUpdate(transaction.userId, {
        $inc: { creditBalance: transaction.credits }
      });

      transaction.status = "COMPLETED";
      await transaction.save();

      return res.json({ success: true });
    }

    res.json({ success: false, message: "Payment not completed" });
  } catch (error) {
    console.error("PAYPAL CAPTURE ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

/* ================= EXPORTS ================= */
export {
  registerUser,
  loginUser,
  userCredits,
  createPaypalOrder,
  capturePaypalOrder
};
