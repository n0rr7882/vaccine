import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    tags: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    contents: { type: String, required: true },
    comments: [{
        authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
        contents: { type: String, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
        goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
    }],
    goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
}, { timestamps: true });

export default mongoose.model('post', postSchema);