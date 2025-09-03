import { Router } from 'express';
import { login ,signup , logout, onboard } from '../controllers/auth.controller.js';
import {authorize} from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/signup' , signup);
router.post('/login' , login);
router.post('/logout' , logout);

router.post('/onboarding' ,authorize , onboard);
router.get('/me', authorize, (req,res)=> {
    res.status(200).json({success:true, user: req.user})
})
export default router;