import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    hashtags: [{ type: String, required: true }],
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'comment' }],
    goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
}, { timestamps: true });

export default mongoose.model('post', postSchema);