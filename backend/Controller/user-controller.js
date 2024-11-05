import User from '../Model/user.js';

import Token from '../Model/token.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export default async function signupUser(req, res) {
    try {
        const user = req.body;

        // Check for required fields
        if (!user.name || !user.username || !user.password) {
            console.log('fields cannot be empty');
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(user.password,10);
        
        const encryptedUser = {name:user.name,username:user.username,password:hashedPassword};
        // Check for existing user
        const existingUser = await User.findOne({ username: encryptedUser.username });
        
        if (existingUser) {
            console.log(`Username already taken: ${encryptedUser.username}`);
            return res.status(409).json({ msg: 'Username already exists, please choose another' });
        }

        // Create and save the new user
        const newUser = new User(encryptedUser); // Use 'new' to create an instance
        await newUser.save();
        return res.status(200).json({ msg: 'Signup successful' });

    } catch (err) {// if not saved nor found.
        console.error('Error during signup:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: err.message });
        }

        return res.status(500).json({ msg: `Error while signing up: ${err.message}` });
    }
}

export async function login(req,res){
    const user = req.body;
    if(!user.username||!user.password){
        return (res.status(400).json({msg:'all fields are required!'}));
    }
    const existingUser = await User.findOne({username:user.username});
    if(!existingUser){
        return (res.status(404).json({msg:'username doesnot exists!'}));
    }
    try{
        const isSame = await bcrypt.compare(user.password,existingUser.password);
        if(!isSame){
            return (res.status(401).json({msg:'wrong password!'}));
        }else{
            const accessToken = jwt.sign(existingUser.toJSON(),process.env.Secret_Access_Key,{expiresIn:'15m'});
            const refreshToken = jwt.sign(existingUser.toJSON(),process.env.Secret_Refresh_Key);

            //storing in db:
            // const newToken = Token.save(refreshToken); not work cuz we modelled out schema to take a key token and then a string.
            const newToken = new Token({token:refreshToken});// and new keyword is used to create an instance.
            await newToken.save();
            return (res.status(200).json({msg:`welcome ${existingUser.name}`,accessToken:accessToken,refreshToken:refreshToken,userName:existingUser.username,name:existingUser.name}));
        }
    }catch(error){
        return res.status(500).json({msg:'error while login in'});
    }
}