import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
    description:{
        type:String ,
        required: true
    }
    ,
    userName: {
        type: String,
        required: true
    }
    ,postId:{
        type: String,
        required:true
    }
    ,createDate:{
        type: Date ,
        required: true
    },
    editDate:{
        type:Date,
        required:false
    }
});

const commentModel = mongoose.model('comment',commentSchema);

export default commentModel;
