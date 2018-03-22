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
            throw new Error('포스트가 존재하지 않습니다.');
        }
        const data = checkProperty(req.body, 'comment', true);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        const comment = await Comment.create({ post: post._id, author: req.user.id, content: data.data.content });
        post.comments.push(comment._id);
        post.save();
        comment.__v = undefined;
        return res.send({ message: 'SUCCESS', comment });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

router.get('/:commentId', async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            throw new Error('존재하지 않는 댓글입니다.');
        }
        return res.send({ message: 'SUCCESS', comment });

    } catch ({ message }) {
        return res.send(400, { message });
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
        return res.send(400, { message });
    }

});

router.put('/:commentId', filter, async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            throw new Error('존재하지 않는 댓글입니다.');
        }
        if (req.user.id.toString() !== comment.author.toString()) {
            throw new Error('권한이 부족합니다.');
        }
        const { message, data: { content } } = checkProperty(req.body, 'comment', false);
        if (message !== 'SUCCESS') {
            throw new Error(message);
        }
        comment.content = content;
        const result = await comment.save();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

router.delete('/:commentId', filter, async (req, res) => {

    try {

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            throw new Error('존재하지 않는 댓글입니다.');
        }
        const post = await Post.findById(comment.post);
        if (post) {
            post.comments.pull(comment._id);
            post.save();
        }
        const result = await comment.destroy();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

export default router;