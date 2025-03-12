import { User, Thought } from '../models/index.js';
import mongoose from 'mongoose';
import cleandb from './cleanDB.js';
import db from '../config/connection.js';
import { users, thoughts } from './data.js';

const seedDatabase = async () => {
    try {
        // Connect to database
        await db();

        // Clean database
        await cleandb();

        // Insert users
        await User.insertMany(users);
        console.log('Users inserted.');

        // Insert thoughts
        await Thought.insertMany(thoughts);
        console.log('Thoughts inserted.');

        console.log('Seeding complete! 🌱');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
    }
};

seedDatabase();