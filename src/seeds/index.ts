import { User, Thought, IUser, IThought } from '../models/index.js';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import cleandb from './cleanDB.js';
import db from '../config/connection.js';

const seedDatabase = async () => {
    try {
        // Connect to the database
        await db();  
        // Clean the database before seeding
        await cleandb();  

        // Create an array to hold users
        const users: (IUser & {_id: mongoose.Types.ObjectId})[] = [];

        // Create 10 users using faker to generate fake information
        for (let i = 0; i < 10; i++) {
            const user = new User({
                username: faker.internet.username(),
                email: faker.internet.email(),
                thoughts: [],
                friends: []
            });
            users.push(user as IUser & { _id: mongoose.Types.ObjectId });
        }

        // Insert users into the database
        await User.insertMany(users);

        // Create an array to hold thoughts
        const thoughts: IThought[] = [];

        // Generate 3 thoughts for each user
        users.forEach(user => {
            const userThoughts: mongoose.Types.ObjectId[] = [];
            for (let i = 0; i < 3; i++) {
                const thought = new Thought({
                    thoughtText: faker.lorem.sentence(),
                    createdAt: new Date(),
                    username: user.username,
                    reactions: [], // Initialize empty reactions array
                });
                thoughts.push(thought);
                userThoughts.push(thought._id as mongoose.Types.ObjectId);

                // Generate random reactions for thoughts
                const numReactions = Math.floor(Math.random() * 5);  // Max 5 reactions
                for (let j = 0; j < numReactions; j++) {
                    thought.reactions.push({
                        reactionId: new mongoose.Types.ObjectId(),
                        reactionBody: faker.helpers.arrayElement(['Like', 'Love', 'Wow', 'Sad', 'Angry']),
                        username: faker.internet.username(),
                        createdAt: new Date()
                    });
                }
            }
            user.thoughts = userThoughts;
        });

        // Insert thoughts with reactions
        await Thought.insertMany(thoughts);  

        // Assign friends to each user
        users.forEach(user => {
            const friends = users.filter(u => !u._id.equals(user._id));
            user.friends = friends.slice(0, 3).map(friend => friend._id);
        });

        // Save all users
        await Promise.all(users.map(user => user.save()));  

        console.log('Seeding complete! 🌱');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close(); 
    }
};

seedDatabase();