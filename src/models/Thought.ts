// UPDATE THIS CODE!!!!!!

import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: {
        reactionId: mongoose.Types.ObjectId,
        reactionBody: string,
        username: string,
        createdAt: Date,
    }[];
}

const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: new mongoose.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        _id: false,
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        timestamps: true
    },
);


// Use a getter method to format the timestamp on query ???

// Virtual property to get the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length || 0;
});

// Initialize Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
