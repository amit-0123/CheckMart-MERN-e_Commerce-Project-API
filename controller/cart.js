import { Cart } from "../model/Cart.js";

// add to cart
export const addToCart= async(req,res)=>{
    const {productId,title,price,qty,imageSrc} = req.body;
    // abhi k liye hard core karo userId yani ki fixed , kyoki ye to koibhi user ho sakta h n

    // const userId = "66effe98554716e8772b5b82"; 
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) {
        cart = new Cart({userId,items:[]})
    }
    // if same item is added again then
    const itemIndex = cart.items.findIndex((item)=>item.productId.toString()===productId)
    if(itemIndex>-1){
        cart.items[itemIndex].qty+=qty;
        cart.items[itemIndex].price+=price*qty
    }else{
        cart.items.push({productId,title,price,qty,imageSrc});
    }

    await cart.save();
    res.json({message:'Items added to cart',cart});
};

// get user cart
export const userCart = async(req,res)=>{
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:'Cart not found'});
    res.json({message:'User cart',cart});
}

// remove product item from cart item
export const removeProductFromCart = async(req,res)=>{
    const productId = req.params.productId;
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:'Cart not found'});

    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)
    await cart.save();
    res.json({message:'product removed from cart'});  
}


// clear cart
export const clearCart = async(req,res)=>{
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart){
       cart = new Cart({items:[]});
    } else{
        cart.items = [];
    }

    await cart.save();
    res.json({message:'cart cleared'});  
}

// decrease qty
export const decreaseProductQty= async(req,res)=>{ 
    const {productId,qty} = req.body;
    
    // abhi k liye hard core karo userId yani ki fixed , kyoki ye to koibhi user ho sakta h n
    const userId = req.user; 

    let cart = await Cart.findOne({userId});
    if(!cart) {
        cart = new Cart({userId,items:[]})
    }
    // if same item is added again then
    const itemIndex = cart.items.findIndex((item)=>item.productId.toString()===productId);

    if(itemIndex>-1){
        const item = cart.items[itemIndex]

        if(item.qty>qty){
        const pricePerUnit = item.price/item.qty
        item.qty-=qty
        item.price-=pricePerUnit*qty
        }else{
            cart.items.splice(itemIndex,1);
        }

    }else{
        return res.json({message:'Invalid product Id'})
    }

    await cart.save();
    res.json({message:'Items qty decreased',cart});
};