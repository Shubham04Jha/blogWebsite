import express from 'express';
import signupUser, { login } from '../Controller/user-controller.js';
import upload from '../utils/Upload.js'
import {createPost,getAllPosts, getPost,updatePost,deletePost} from '../Controller/post-controller.js';
import { authenticateToken } from '../Controller/jwt-controller.js';

import { uploadImage,getImage } from '../Controller/image-controller.js';

const router = express.Router();

router.post('/signup',signupUser);

router.post('/login',login);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:id',getImage);

router.post('/createPost',authenticateToken,createPost)

router.get('/posts',authenticateToken,getAllPosts)

router.get('/post/:id',authenticateToken,getPost)

router.put('/update/:id', authenticateToken, updatePost);

router.delete('/delete/:id', authenticateToken, deletePost);





router.get('/shubham',(req,res)=>{
    return res.send('code');
})
export default router;