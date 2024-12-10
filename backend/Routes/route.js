import express from 'express';
import signupUser, { login, logoutUser } from '../Controller/user-controller.js';
import upload from '../utils/Upload.js'
import {createPost,getAllPosts, getPost,updatePost,deletePost} from '../Controller/post-controller.js';
import { authenticateToken,createNewToken } from '../Controller/jwt-controller.js';

import { uploadImage,getImage } from '../Controller/image-controller.js';

import { createComment, deleteComment, getComments } from '../Controller/comment-controller.js';

const router = express.Router();

router.post('/signup',signupUser);

router.post('/login',login);
router.post('/logout',authenticateToken,logoutUser);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:id',getImage);

router.post('/createPost',authenticateToken,createPost)

router.get('/posts',authenticateToken,getAllPosts)

router.get('/post/:id',authenticateToken,getPost)

router.put('/update/:id', authenticateToken, updatePost);

router.delete('/delete/:id', authenticateToken, deletePost);

router.post('/refreshTokens',createNewToken);

//comments.....
router.post('/comments/add',authenticateToken,createComment);
router.get('/comments/get/:id',authenticateToken,getComments);
router.delete('/comments/delete/:id',authenticateToken,deleteComment);


export default router;