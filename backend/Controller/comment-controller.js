import commentModel from "../Model/comment.js";


export const createComment = async (request,response)=>{
    try{
        const comment = await new commentModel(request.body);
        await comment.validate();
        await comment.save();
        return response.status(200).json({msg:'comment saved successfully'})
    }catch(error){
        return response.status(500).json(error)
    } 
}

export const getComments = async (request, response) => {
    try {
        const comments = await commentModel.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteComment = async (request, response) => {
    try {
        await commentModel.findByIdAndDelete(request.params.id);
        // await comment.delete()

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}