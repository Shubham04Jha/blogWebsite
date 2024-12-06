
import Post from '../Model/post.js'



export const createPost = async (request,response)=>{
    try{
        const post = await new Post(request.body);
        post.save();
        return response.status(200).json({msg:'Post saved successfully'})
    }catch(error){
        return response.status(500).json(error)
    } 
}