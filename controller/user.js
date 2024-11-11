import { User } from "../model/User.js";
// bcrypt used to hash password
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'



// user register
export const register = async(req,res)=>{
    const {name,email,password} = req.body;

    try {
       let user = await User.findOne({email});
       if(user) return res.json({message:"User already exist",success:false});
       const hashPass = await bcrypt.hash(password,10);
        user = await User.create({name,email,password:hashPass}); 
       res.json({message:"You have registered Successfully",user,success:true})  ;
    } catch (error) {
        res.json({message:error.message})
    }
}

// user login
export const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"email and password are required"});
    }

    try {
    let user = await User.findOne({email});

    if(!user) return res.json({message:"User not found...!",success:false});

    const validPass = await bcrypt.compare(password,user.password)

    if(!validPass)  return res.status(400).json({message:"Invalid Credential",success:false});

    const token = jwt.sign({userId:user._id},"!@#$%^&*()",{
        expiresIn:'365d'
    })
    
    res.json({message:`Welcome  ${user.name}`,token,success:true});

    } catch (error) {
        res.json({message:error.message});
    }

}

// get all users
export const users = async(req,res)=>{
    try {
        let users = await User.find();
        res.json(users);
    } catch (error) {
        res.json(error.message);
    }
}

// get user profile
export const profile = async(req,res)=>{
    res.json({user:req.user})
}