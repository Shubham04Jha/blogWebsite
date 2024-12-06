
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

export const getAllPosts = async(req,res)=>{
    let category = req.query.category;
    let posts;
    // console.log(category)
    try{
        // to do... it must be query here...
        if(category){
            posts = await Post.find({category:category}) 
        }else{
            posts = await Post.find({category:category})
        }
        return res.status(200).json(posts);
    }catch(error){
        return res.status(500).json(error);
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}