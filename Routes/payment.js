import express from 'express'
import { verify ,checkout, userOrder, allOrders} from '../controller/payment.js';
const router = express.Router();
import { Authenticated } from '../middleware/IsAuthenticated.js';

// checkout
router.post('/checkout',checkout)

// verify -payment & save to db
router.post('/verify-payment',verify)

// user order
router.get('/userorder',Authenticated,userOrder)

// all orders
router.get('/orders',allOrders)

export default router;