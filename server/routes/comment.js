import { Router } from 'express';
import Post from '../database/models/Post';
import Comment from '../database/models/Comment';
import { checkProperty } from '../tools/validator';
import { filter } from '../tools/authentication';

const router = Router();

router.post('/:postId', filter, async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error('POST_NOT_FOUND');
        }
        const { message, data: { content } } = checkProperty(req.body, 'comment', true);
        if (message !== 'SUCCESS') {
            throw new Error(message);
        }
        const comment = Comment.create({ post: post._id, author: req.user.id, content });
        post.comments.push(comment._id);
        const result = post.save();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.get('/:commentId', async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            throw new Error('COMMENT_NOT_FOUND');
        }
        return res.send({ message: 'SUCCESS', comment });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.get('/', async (req, res) => {

    try {

        const { limit, offset, by, q } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        if (!(by && q)) {
            throw new Error('BY_OR_Q_NOT_EXIST');
        }
        const comments = await Comment.find()
            .where(by, RegExp(q))
            .skip(Number(offset))
            .limit(Number(limit))
            .sort('createdAt');
        return res.send({ message: 'SUCCESS', comments });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.put('/:commentId', filter, async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            throw new Error('COMMENT_NOT_FOUND');
        }
        const { message, data: { content } } = checkProperty(req.body, 'comment', false);
        if (message !== 'SUCCESS') {
            throw new Error(message);
        }
        comment.content = content;
        const result = await comment.save();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.delete('/:commentId', filter, async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            throw new Error('COMMENT_NOT_FOUND');
        }
        const post = await Post.findById(comment.post);
        if (post) {
            post.comments.pull(comment._id);
            post.save();
        }
        const result = await comment.destroy();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send({ message });
    }

});

export default router;