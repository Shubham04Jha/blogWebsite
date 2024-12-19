import mongoose from 'mongoose';

const Connection = async (mongoUrl) => {
    const dbUrl = mongoUrl;
    try{
        await mongoose.connect(dbUrl);
        // console.log('connection with db successful');
    }
    catch(error){
        // console.log('connection failed : ',error);
    }
};

export default Connection;
