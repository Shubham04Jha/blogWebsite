import express from 'express';
import signupUser, { login } from '../Controller/user-controller.js';

const router = express.Router();

router.post('/signup',signupUser);

router.post('/login',login);

router.get('/chinmay',(req,res)=>{
    return res.send('code');
})
export default router;