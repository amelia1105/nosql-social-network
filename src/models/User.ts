// UPDATE THIS CODE!!!!!!


import { Schema, model, type Document } from 'mongoose';

// Define the interface for the User model
interface IUser extends Document {
    username: string,
    email: string,
    thoughts?: Schema.Types.ObjectId[],
    friends?: Schema.Types.ObjectId[]
}

// Define the User schema
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
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Virtual property to get the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length || 0;
});

// Initialize User model
const User = model<IUser>('User', userSchema);

export default User;
