// UPDATE THIS CODE!!!!!!
import { Schema, model } from 'mongoose';
// Define the User schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
}, {
    toJSON: {
        virtuals: true,
    },
});
// Virtual property to get the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length || 0;
});
// Initialize User model
const User = model('User', userSchema);
export default User;
