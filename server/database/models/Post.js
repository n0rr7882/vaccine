import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    hashtags: [{ type: String, required: true }],
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'comment' }],
    goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
}, { timestamps: true });

function remove__v(next) {
    this.select('-__v');
    return next();
}

postSchema.pre('find', remove__v);
postSchema.pre('findOne', remove__v);
postSchema.pre('findById', remove__v);

export default mongoose.model('post', postSchema);