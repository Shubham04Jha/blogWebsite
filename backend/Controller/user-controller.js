import User from '../Model/user.js';

export default async function signupUser(req, res) {
    try {
        const user = req.body;

        // Check for required fields
        if (!user.name || !user.username || !user.password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) {
            console.log(`User already exists: ${user.username}`);
            return res.status(409).json({ msg: 'Username already exists, please choose another' });
        }

        // Create and save the new user
        const newUser = new User(user); // Use 'new' to create an instance
        await newUser.save();

        return res.status(201).json({ msg: 'Signup successful' });
    } catch (err) {// if not saved nor found.
        console.error('Error during signup:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: err.message });
        }

        return res.status(500).json({ msg: `Error while signing up: ${err.message}` });
    }
}
