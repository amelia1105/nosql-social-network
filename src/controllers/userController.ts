import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User, Thought } from '../models/index.js';

// GET All Users /api/users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find(); 
        return res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// GET single user based on id /api/users/:userId
export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await
        User.findById(userId).populate('thoughts').populate('friends');
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// POST (create) new user /api/users
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// PUT (update) user based on id /api/users/:userId
export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true });
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// DELETE user based on id /api/users/:userId
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        // Delete the user's thoughts
        await Thought.deleteMany({ username: user.username });

        // Delete the user from other users' friends lists
        await User.updateMany(
            { friends: { $in: [new ObjectId(req.params.userId)] } },
            { $pull: { friends: new ObjectId(req.params.userId) } }
        );

        return res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// POST to add a friend to a user's friend list /api/users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response) => {
    try { 
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ 
                message: 'No user with this id.'});
        }

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// DELETE to remove a friend from a user's friend list /api/users/:userId/friends/:friendId
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ 
                message: 'No user with this id.'});
        }

        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};