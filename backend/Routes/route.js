import express from 'express';
import signupUser from '../Controller/user-controller.js';

const router = express.Router();

router.post('/signup',signupUser);
router.get('/chinmay',(req,res)=>{
    return res.send('code');
})
export default router;