  import express from 'express'
import { addAddress, getAddress } from '../controller/address.js';
import { Authenticated } from '../middleware/IsAuthenticated.js';

  const router = express.Router();

//   add address
  router.post('/add',Authenticated,addAddress)
//   get address
router.get('/get',Authenticated,getAddress)

  export default router;