import express from "express";
import Post from "../models/Post";
import Comment from "../models/Comment";
import {CommentMutation} from "../types";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";


const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    try {
        const post = req.query.post;

        if (!post || !mongoose.isValidObjectId(post)) {
            return res.status(404).send({error: 'Post not found!'})
        }

        const comments = await Comment.find({ post }).populate('user', 'username');

        return res.send(comments);
    } catch (e) {
        return next(e);
    }
});

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
    try {

        if (!req.user || !mongoose.isValidObjectId(req.body.post)) {
            return res.status(404).send({error: 'User or Post are not found!'});
        }

        if (!req.body.message) {
            return res.status(404).send({error: 'Message is required!'});
        }

        const commentMutation: CommentMutation = {
            user: req.user._id,
            post: req.body.post,
            message: req.body.message,
        };

        const comment = new Comment(commentMutation);
        await comment.save();

        return res.send(comment);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default commentsRouter;
