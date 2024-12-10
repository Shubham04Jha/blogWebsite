import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true, index: { expires: '0s' } }, // TTL index
});

// creating the collection here:
const token = mongoose.model('tokens',tokenSchema);
export default token;
