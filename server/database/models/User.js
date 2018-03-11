import mongoose, { Schema } from 'mongoose';
import { password } from '../../tools/password';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: 'text' },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = password(this.password);
    return next();
});

userSchema.methods.comparePassword = function (plainPassword) {
    if (this.password === password(plainPassword)) return true;
    return false;
};

export default mongoose.model('user', userSchema);