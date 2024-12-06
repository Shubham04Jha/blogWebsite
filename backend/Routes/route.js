import express from 'express';
import signupUser, { login } from '../Controller/user-controller.js';
import upload from '../utils/Upload.js'
import {createPost} from '../Controller/post-controller.js';
import { authenticateToken } from '../Controller/jwt-controller.js';

import { uploadImage,getImage } from '../Controller/image-controller.js';

const router = express.Router();

router.post('/signup',signupUser);

router.post('/login',login);

router.post('/file/upload',upload.single('file'),uploadImage);

router.post('/createPost',authenticateToken,createPost)

router.get('/file/:id',getImage);



router.get('/shubham',(req,res)=>{
    return res.send('code');
})
export default router;