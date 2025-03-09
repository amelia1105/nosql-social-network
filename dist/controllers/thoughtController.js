import { User, Thought } from '../models/index.js';
// GET all thoughts /api/thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// GET single thought based on id /api/thoughts/:thoughtId
export const getSingleThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({
                message: 'No thoughts found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// POST (create) thought /api/thoughts
export const createThought = async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({
            thoughtText,
            username
        });
        await User.findOneAndUpdate({ username }, { $push: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
// PUT (update) thought based on id /api/thoughts/:thoughtId
export const updateThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true, runValidators: true });
        if (updatedThought) {
            res.json(updatedThought);
        }
        else {
            res.status(404).json({
                message: 'No thought found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// DELETE thought based on id /api/thoughts/:thoughtId
export const deleteThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const deletedThought = await Thought.findByIdAndDelete(thoughtId);
        if (deletedThought) {
            res.json(deletedThought);
        }
        else {
            res.status(404).json({
                message: 'No thought found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// POST (create) reaction to thought /api/thoughts/:thoughtId/reactions
export const addReaction = async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: { reactionBody, username } } }, { new: true, runValidators: true });
        if (updatedThought) {
            res.json(updatedThought);
        }
        else {
            res.status(404).json({
                message: 'No thought found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// DELETE reaction from thought /api/thoughts/:thoughtId/reactions
export const removeReaction = async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionId } = req.body;
    try {
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
        if (updatedThought) {
            res.json(updatedThought);
        }
        else {
            res.status(404).json({
                message: 'No thought found'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
