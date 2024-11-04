import User from '../Model/user.js';

import bcrypt from 'bcrypt';


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
            console.log(`User already exists: ${encryptedUser.username}`);
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
