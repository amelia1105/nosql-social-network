// UPDATE THIS CODE!!!!!!

import { Schema, model, Types, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions?: {
        reactionId: Schema.Types.ObjectId,
        reactionBody: string,
        username: string,
        createdAt: Date
    }[],
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: 'Thought cannot be blank.',
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
        reactions: [
            {
                reactionId: {
                    type: Schema.Types.ObjectId,
                    default: () => new Types.ObjectId(),
                },
                reactionBody: {
                    type: String,
                    required: 'Reaction cannot be blank.',
                    minlength: 1,
                    maxlength: 280,
                },
                username: {
                    type: String,  
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);


// Use a getter method to format the timestamp on query ???

// Virtual property to get the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
