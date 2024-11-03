import mongoose from 'mongoose';

const Connection = async (mongoUrl) => {
    URL = mongoUrl;
    try{
        await mongoose.connect(URL);
        console.log('connection with db successful');
    }
    catch(error){
        console.log('connection failed : ',error);
    }
};

export default Connection;
