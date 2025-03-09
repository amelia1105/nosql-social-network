import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { getRandomUsername, getRandomThoughts, getRandomFriends, getRandomReactions } from './data.js';
try {
    // Connect to the database and clean it
    await db();
    await cleanDB();
    // Create empty array to hold the users
    const users = [];
    // Loop 20 times -- add 20 users to the users array for testing
    for (let i = 0; i < 20; i++) {
        // Get some random thoughts and random usernames
        const thoughts = getRandomThoughts(20);
        const username = getRandomUsername();
        const email = `${username}@example.com`;
        users.push({
            username,
            email,
            thoughts,
            friends: getRandomFriends(5, username),
        });
    }
    // Add users to the collection and await the results
    const userData = await User.create(users);
    // Add thoughts to the collection and await the results
    await Thought.create(userData.map(({ username, thoughts }) => thoughts.map((thought) => ({
        thoughtText: thought,
        username,
        reactions: getRandomReactions(3),
    }))).flat());
    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
