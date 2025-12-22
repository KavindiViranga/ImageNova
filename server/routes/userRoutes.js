import express from 'express'
import {registerUser, loginUser, userCredits, createPaypalOrder, capturePaypalOrder} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post("/create-paypal-order", userAuth, createPaypalOrder);
userRouter.post("/capture-paypal-order", userAuth, capturePaypalOrder);


export default userRouter

