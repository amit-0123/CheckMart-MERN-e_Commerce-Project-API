import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },

    fullName:{type:String,require:true},
    address:{type:String,required:true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    country:{type:String,required:true},
    pincode:{type:Number,required:true},
    phoneNumber:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
});

export const Address = mongoose.model("Address",addressSchema);