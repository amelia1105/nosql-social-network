import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// GET all thoughts /api/thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single thought based on id /api/thoughts/:thoughtId
export const getSingleThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if(thought) {
      res.json(thought);
    } else {
      res.status(404).json({
        message: 'No thoughts found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST (create) thought /api/thoughts
export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username } = req.body;
  try {
    const newThought = await Thought.create({
      thoughtText,
      username
    });
    await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.status(201).json(newThought);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};

// PUT (update) thought based on id /api/thoughts/:thoughtId
export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if(updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({
        message: 'No thought found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE thought based on id /api/thoughts/:thoughtId
export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if(deletedThought) {
      res.json(deletedThought);
    } else {
      res.status(404).json({
        message: 'No thought found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

// POST (create) reaction to thought /api/thoughts/:thoughtId/reactions
export const addReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true, runValidators: true }
    );
    if (updatedThought) {
      res.json(updatedThought);
    } else {
      res.status(404).json({
        message: 'No thought found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE reaction from thought /api/thoughts/:thoughtId/reactions/:reactionId
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (updatedThought) {
      return res.json(updatedThought);
    } else {
      return res.status(404).json({
        message: 'No thought or reaction found with this id!'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
