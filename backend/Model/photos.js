import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    data: {
        type: Buffer, // Binary data
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now, // Automatically set the date
    },
});

const Photo = mongoose.model('photos', photoSchema);
export default Photo;
