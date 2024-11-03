import express from 'express';
import signupUser from '../Controller/user-controller.js';

const router = express.Router();

router.post('/signup',signupUser);

export default router;