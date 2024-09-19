import express from "express";
import Post from "../models/Post";
import {imagesUpload} from "../multer";
import {PostMutation} from "../types";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";


const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
   try {
       const posts = await Post.find().populate('user', 'username');
       return res.send(posts);
   } catch (e) {
       return next(e);
   }
});

postsRouter.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        return res.send(post);
    } catch (error) {
       return next(error);
    }
});

postsRouter.post('/', imagesUpload.single('image'), auth, async (req: RequestWithUser, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).send({error: 'User not found!'});
        }

        const PostMutation: PostMutation = {
            user: req.user._id,
            title: req.body.title,
            description: req.body.description || null,
            image: req.file ? req.file.filename : null,
        };

        const post = new Post(PostMutation);
        await post.save();

        return res.send(post);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default postsRouter;
