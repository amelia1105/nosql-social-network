import { IUser, IThought } from '../models/index.js';
import mongoose from 'mongoose';

export const users: (IUser & { _id: mongoose.Types.ObjectId })[] = [
    new mongoose.models.User({
        _id: new mongoose.Types.ObjectId(),
        username: "john_doe",
        email: "john@example.com",
        thoughts: [],
        friends: []
    }),
    new mongoose.models.User({
        _id: new mongoose.Types.ObjectId(),
        username: "jane_smith",
        email: "jane@example.com",
        thoughts: [],
        friends: []
    }),
    new mongoose.models.User({
        _id: new mongoose.Types.ObjectId(),
        username: "alice_wonder",
        email: "alice@example.com",
        thoughts: [],
        friends: []
    }),
    new mongoose.models.User({
        _id: new mongoose.Types.ObjectId(),
        username: "bob_builder",
        email: "bob@example.com",
        thoughts: [],
        friends: []
    }),
    new mongoose.models.User({
        _id: new mongoose.Types.ObjectId(),
        username: "charlie_brown",
        email: "charlie@example.com",
        thoughts: [],
        friends: []
    }),
    new mongoose.models.User({
        _id: new mongoose.Types.ObjectId(),
        username: "daisy_duke",
        email: "daisy@example.com",
        thoughts: [],
        friends: []
    })
];

export const thoughts: IThought[] = [
    new mongoose.models.Thought({
        _id: new mongoose.Types.ObjectId(),
        thoughtText: "Just finished a great book!",
        createdAt: new Date(),
        username: users[0].username,
        reactions: [
            {
                reactionId: new mongoose.Types.ObjectId(),
                reactionBody: "Love it!",
                username: users[1].username,
                createdAt: new Date()
            }
        ]
    }),
    new mongoose.models.Thought({
        _id: new mongoose.Types.ObjectId(),
        thoughtText: "Had an amazing dinner tonight!",
        createdAt: new Date(),
        username: users[1].username,
        reactions: [
            {
                reactionId: new mongoose.Types.ObjectId(),
                reactionBody: "Yum!",
                username: users[2].username,
                createdAt: new Date()
            },
            {
                reactionId: new mongoose.Types.ObjectId(),
                reactionBody: "Sounds delicious!",
                username: users[3].username,
                createdAt: new Date()
            }
        ]
    }),
    new mongoose.models.Thought({
        _id: new mongoose.Types.ObjectId(),
        thoughtText: "Excited for the weekend!",
        createdAt: new Date(),
        username: users[2].username,
        reactions: []
    }),
    new mongoose.models.Thought({
        _id: new mongoose.Types.ObjectId(),
        thoughtText: "Loving the new season of my favorite show!",
        createdAt: new Date(),
        username: users[3].username,
        reactions: [
            {
                reactionId: new mongoose.Types.ObjectId(),
                reactionBody: "Can't wait to watch it!",
                username: users[4].username,
                createdAt: new Date()
            }
        ]
    }),
    new mongoose.models.Thought({
        _id: new mongoose.Types.ObjectId(),
        thoughtText: "Just got a new job!",
        createdAt: new Date(),
        username: users[4].username,
        reactions: [
            {
                reactionId: new mongoose.Types.ObjectId(),
                reactionBody: "Congratulations!",
                username: users[5].username,
                createdAt: new Date()
            }
        ]
    }),
    new mongoose.models.Thought({
        _id: new mongoose.Types.ObjectId(),
        thoughtText: "Enjoying a sunny day at the beach!",
        createdAt: new Date(),
        username: users[5].username,
        reactions: []
    })
];

// Assign thoughts to users
users[0].thoughts = [thoughts[0] as unknown as mongoose.Types.ObjectId];
users[1].thoughts = [thoughts[1] as unknown as mongoose.Types.ObjectId];
users[2].thoughts = [thoughts[2] as unknown as mongoose.Types.ObjectId];
users[3].thoughts = [thoughts[3] as unknown as mongoose.Types.ObjectId];
users[4].thoughts = [thoughts[4] as unknown as mongoose.Types.ObjectId];
users[5].thoughts = [thoughts[5] as unknown as mongoose.Types.ObjectId];

// Assign friends to users
users[0].friends = [users[1]._id, users[2]._id];
users[1].friends = [users[0]._id, users[3]._id];
users[2].friends = [users[0]._id];
users[3].friends = [users[1]._id, users[4]._id];
users[4].friends = [users[3]._id, users[5]._id];
users[5].friends = [users[4]._id];
