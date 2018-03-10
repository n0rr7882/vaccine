import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    tags: { type: String, required: true },
    author: String,
    contents: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('post', postSchema);