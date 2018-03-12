import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    hashtags: [{ type: String, required: true }],
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    contents: { type: String, required: true },
    comments: [{
        author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
        contents: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
        goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
    }],
    goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
}, { timestamps: true });

export default mongoose.model('post', postSchema);