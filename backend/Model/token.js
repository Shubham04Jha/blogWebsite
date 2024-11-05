import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    }
})

// creating the collection here:
const token = mongoose.model('tokens',tokenSchema);
export default token;