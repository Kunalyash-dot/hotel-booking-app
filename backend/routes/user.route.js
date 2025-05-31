
import express from 'express'
import { loginController, logoutController, registerController } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get('/logout',auth,logoutController)


export default router;
