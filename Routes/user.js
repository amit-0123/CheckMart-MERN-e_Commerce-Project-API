import express from 'express'
import { login, profile, register, users } from '../controller/user.js';
import { Authenticated } from '../middleware/IsAuthenticated.js';



const router = express.Router()

// register user
router.post('/register',register);
// login user
router.post('/login',login);
// get all users
router.get('/all',users);
// get user profile 
router.get('/profile',Authenticated,profile)

export default router;