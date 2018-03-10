import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    postId: { type: String, required: true },
    author: { type: String, required: true },
    contents: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('post', postSchema);