// UPDATE THIS CODE!!!!!!
import { Schema, model, Types } from 'mongoose';
const thoughtSchema = new Schema({
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
    reactions: [
        {
            reactionId: {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
            },
            reactionBody: {
                type: String,
                required: true,
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
}, {
    toJSON: {
        virtuals: true,
    },
    timestamps: true
});
// Use a getter method to format the timestamp on query ???
// Virtual property to get the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length || 0;
});
// Initialize Thought model
const Thought = model('Thought', thoughtSchema);
export default Thought;
