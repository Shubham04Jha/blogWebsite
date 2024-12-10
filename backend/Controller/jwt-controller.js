import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Token from '../Model/token.js'
dotenv.config();

export const authenticateToken = (request,response,next)=>{
    // console.log(request.headers);
    const authHeader =request.headers['authorization']
    const token = authHeader;
    if(token==null){
        return response.status(401).json({msg:'token is missing'})
    }
    console.log
    jwt.verify(token,process.env.Secret_Access_Key,(err,user)=>{
        if(err){
            return response.status(403).json({msg:'invalid token'})
        }
        request.user = user;
        next();
    })
}

export const createNewToken = async (req, res) => {
    const refreshToken = req.body.token; 
    // console.log(req.body)
    if (!refreshToken) {
        return res.status(401).json({ msg: 'Refresh token is missing' });
    }

    try {
        // Check if the refresh token is in the database
        const tokenInDb = await Token.findOne({ token: refreshToken });

        if (!tokenInDb) {
            return res.status(404).json({ msg: 'Refresh token is not valid' });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.Secret_Refresh_Key, (err, decodedUser) => {
            if (err) {
                // Handle specific JWT errors (expired, invalid)
                console.log(err);
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ msg: 'Refresh token expired' });
                } else {
                    return res.status(500).json({ msg: 'Invalid refresh token' });
                }
            }
            // console.log(decodedUser);
            // If the refresh token is valid, generate a new access token
            const { exp,iat, ...userData } = decodedUser;  // Destructure and remove `exp`
            const accessToken = jwt.sign(
                userData,  // Only include necessary data in the access token
                process.env.Secret_Access_Key,
                { expiresIn: '15m' }
            );

            // Respond with the new access token
            return res.status(200).json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
