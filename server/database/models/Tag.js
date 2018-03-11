import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
    name: { type: String, required: true, unique: true, index: true },
    firstAuthor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }
}, { timestamps: true });

export default mongoose.model('tag', tagSchema);