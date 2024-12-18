import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required :true
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    }
})

const model = mongoose.model('users',userSchema);
export default model;