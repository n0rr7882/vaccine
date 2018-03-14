import mongoose, { Schema } from 'mongoose';
import { password } from '../../tools/password';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: 'text' },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }]
}, { timestamps: true });

function encryptPassword(next) {
    if (!this.isModified('password')) return next();
    this.password = password(this.password);
    return next();
}

function removePassword(next) {
    this.select('-password -__v');
    return next();
}

userSchema.pre('save', encryptPassword);
userSchema.pre('update', encryptPassword);
userSchema.pre('find', removePassword);
userSchema.pre('findOne', removePassword);
userSchema.pre('findById', removePassword);

userSchema.methods.comparePassword = function (plainPassword) {
    if (this.password === password(plainPassword)) return true;
    return false;
};

userSchema.statics.login = function (email, plainPassword) {
    return this.where('email', email).where('password', password(plainPassword));
}

export default mongoose.model('user', userSchema);