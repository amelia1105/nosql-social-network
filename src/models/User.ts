import { Schema, Types, model, type Document } from 'mongoose';

export interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Types.ObjectId[],
    friends: Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
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
        type: Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
}, {
    toJSON: {
        virtuals: true,
        transform: (_doc, ret) => {
            delete ret.id;  // Remove the `id` field
            return ret;
        },
    },
});

// Virtual property to get the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length || 0;
});

// Initialize User model
const User = model<IUser>('User', userSchema);

export default User;