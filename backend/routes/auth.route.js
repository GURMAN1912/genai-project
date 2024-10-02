import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import {  google, SignIn, signOut, SignUp, updateUser } from '../controllers/auth.controller.js';
const router=express.Router();
router.post('/sign-up',SignUp)
router.post("/sign-in",SignIn)
router.post('/google',google);
router.post('/sign-out',signOut);
router.put("/update/:userId",verifyToken,updateUser)
export default router;