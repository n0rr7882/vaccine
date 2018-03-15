import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'post' },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
}, { timestamps: true });

function remove__v(next) {
    this.select('-__v');
    return next();
}

commentSchema.pre('find', remove__v);
commentSchema.pre('findOne', remove__v);
commentSchema.pre('findById', remove__v);

export default mongoose.model('comment', commentSchema);