import { User, Thought } from '../models/index.js';
import mongoose from 'mongoose';
import { getRandomUsers, getRandomThoughts, getRandomReactions } from './data.js';

const seedDatabase = async () => {
    try {
        // Clean the collections before seeding
        await User.deleteMany({});
        await Thought.deleteMany({});
        
        console.log('Database connected and collections cleaned.');

        // Create users and insert them into the User collection
        // Insert random users into the User collection
        const users = await User.insertMany(getRandomUsers(4)); 
        console.log('User collection seeded.');

        // Create thoughts for each user and add reactions
        await Thought.insertMany(users.flatMap(user =>
            getRandomThoughts(3).map(thoughtText => ({
                thoughtText,
                username: user.username,
                reactions: getRandomReactions(3),
            }))
        ));

        console.log('Thought collection seeded.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/socialNetworkDB')
    .then(() => {
        console.log('Database connected.');
        seedDatabase();
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
