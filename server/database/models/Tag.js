import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
    name: { type: String, required: true, unique: true, index: true },
    firstAuthor: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('tag', tagSchema);