import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const authenticateToken = (request,response,next)=>{
    // console.log(request.headers);
    const authHeader =request.headers['authorization']
    const token = authHeader&&authHeader.split(' ')[1]
    if(token==null){
        return response.status(401).json({msg:'token is missing'})
    }
    jwt.verify(token,process.env.Secret_Access_Key,(err,user)=>{
        if(err){
            return response.status(403).json({msg:'invalid token'})
        }
        request.user = user;
        next();
    })
}