import { Product } from "../model/Product.js";

export const addProduct = async(req,res)=>{
    const {title,description,price,qty,category,imageSrc,createdAt} = req.body;
    try {
        let product = await Product.create({title,description,price,qty,category,imageSrc,createdAt});
        res.json({message:'Product added successfully...!',product});
    } catch (error) {
        res.json(error.message);
    }
}

export const getProducts = async(req,res)=>{
    try {
    let products = await Product.find().sort({createdAt:-1});
    res.json({message:"All product",products});
    } catch (error) {
        res.json(error.message);
    }
    
}  

// find product by id
export const  getProductById= async(req,res)=>{
    const id = req.params.id;
    try {
        let product = await Product.findById(id);
        if(!product) return res.json({message:'product not found...!'})
        res.json({message:"Specific product",product});
    } catch (error) {
        res.json(error.message)   
     }
}

// update product by id
export const updateProduct=async(req,res)=>{
    const id = req.params.id;
    try {
        let product = await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) return res.json({message:'product not found..!'});
        res.json({message:'product updates successfully',product});
    } catch (error) {
        res.json(error.message);
    }
}

// delete product by id
export const deleteProduct=async(req,res)=>{
    const id = req.params.id;
    try {
        let product = await Product.findByIdAndDelete(id);
        if(!product) return res.json({message:'product not found..!'});
        res.json({message:'product has been deleted successfully'});
    } catch (error) {
        res.json(error.message);
    }
}