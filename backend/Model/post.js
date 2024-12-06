import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String ,
        required: true
    }
    ,
    blogBanner:{
        type:String
    },
    userName: {
        type: String,
        required: true
    }
    ,
    category:{
        type:String ,
        required: true
    }
    ,
    createDate:{
        type: Date ,
        required: true
    }
});

const post = mongoose.model('post',postSchema);

export default post;
