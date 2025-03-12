import mongoose, { Schema, SchemaTypeOptions, model, type Document } from 'mongoose';

const formatTimestamp = (timestamp: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(timestamp);
};

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
            default: Date.now,
            get: function (timestamp: Date | undefined): any {
                return timestamp ? formatTimestamp(timestamp) : "";
            }
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
            get: function (timestamp: Date | undefined): any {
                return timestamp ? formatTimestamp(timestamp) : "";
            }
        } as SchemaTypeOptions<Date>,
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
            transform: (_doc, ret) => {
                delete ret.id;  // Remove the `_id` field
                return ret;
            }
        },
        timestamps: true
    },
);

// Virtual property to get the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length || 0;
});

// Initialize Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
