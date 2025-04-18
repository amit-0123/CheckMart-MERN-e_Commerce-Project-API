import  {Payment} from "../model/Payment.js";
import Razorpay from 'razorpay'
import dotenv from 'dotenv'

dotenv.config()

// from razorpay nodejs SDK
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

   // checkout
  export const checkout = async (req, res) => {
    try {
        const { amount, cartItems, userShipping, userId,} = req.body;

        const options = {
            amount: amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ orderId: order.id, amount, cartItems, userShipping, userId, payStatus: "created" });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: "Failed to create order", error });
    }
};


    // payment verify,save to db
   export const verify = async(req,res)=>{
      const {orderId,paymentId,signature,amount,orderItems,userId,userShipping} = req.body;

      let orderConfirm = await Payment.create({
        orderId,paymentId,signature,amount,orderItems,userId,userShipping,
        payStatus:"Paid",
      });


      res.json({message:"Payment successFull...",success:true,orderConfirm});
   };




    




//   user specific order
  export const userOrder = async(req,res)=>{
      let userId = req.user._id.toString(); 
    // //   console.log(userId)
      let orders = await Payment.find({userId:userId}).sort({orderDate:-1});
      res.json(orders)
  }

  
  // all specific order
  export const allOrders = async(req,res)=>{
    // let userId = req.user._id.toString();   
  // //   console.log(userId)
    let orders = await Payment.find().sort({orderDate:-1});
    res.json(orders)
}

