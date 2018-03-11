import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'post' },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    contents: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('comment', postSchema);