import express from 'express'
// connecting database with express
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'


// import messageRouter from './Routes/message.js';
// // Add message route
// app.use('/api/message', messageRouter);




import paymentRouter from './Routes/payment.js'


const app = express();
// middleware for parsing the data
app.use(express.json());

app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// home testing route
// app.get('/',(req,res)=>res.json({message:"this is home route"}));

// user Router
app.use('/api/user',userRouter);
// product router
app.use('/api/product',productRouter)
// cart router
app.use('/api/cart',cartRouter)
// address router
app.use('/api/address',addressRouter)

// payment router
app.use('/api/payment',paymentRouter)


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wzxda.mongodb.net/`,
    {dbName:process.env.MONGO_DB_DATABASE}
).then(()=>console.log("mongodb connected successfully...!")).catch(()=>console.log(error));

const port = process.env.PORT;


app.listen(port,()=>{
    console.log(`Your server is running on port number: ${port}`);
})