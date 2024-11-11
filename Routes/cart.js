import express from 'express'
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from '../controller/cart.js';

import { Authenticated } from '../middleware/IsAuthenticated.js';

const router = express.Router();

// add to cart
router.post('/add',Authenticated,addToCart)
// get user cart
router.get('/user',Authenticated,userCart)
// remove product item from cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart)
// clear cart
router.delete('/clear',Authenticated,clearCart)
// decrease qty
router.post('/--qty',Authenticated,decreaseProductQty)


export default router;
