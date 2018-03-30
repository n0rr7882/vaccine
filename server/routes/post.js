import { Router } from 'express';
import Post from '../database/models/Post';
import Comment from '../database/models/Comment';
import { filter } from '../tools/authentication';
import { checkProperty } from '../tools/validator';

const router = Router();

router.post('/', filter, async (req, res) => {

    try {

        const data = checkProperty(req.body, 'post', true);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        data.data.hashtags = data.data.content.match(/#([^\s`~!@#$%^&*()+=-]{2,})/g);
        data.data.author = req.user.id;
        const post = await Post.findById((await Post.create(data.data))._id).populate('author');
        return res.send({ message: 'SUCCESS', post });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

router.get('/count', async (req, res) => {

    try {

        const { by, q, regex } = req.query;
        if (!(by && q)) {
            throw new Error('BY_OR_Q_NOT_EXIST');
        }
        const count = await Post.find()
            .where(by, regex === 'true' ? RegExp(q) : q)
            .count();
        return res.send({ message: 'SUCCESS', count });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

router.get('/:postId', async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId)
            .populate('author');
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        return res.send({ message: 'SUCCESS', post });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

router.get('/', async (req, res) => {

    try {

        const { limit, offset, by, q, regex } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        if (!(by && q)) {
            throw new Error('BY_OR_Q_NOT_EXIST');
        }
        const posts = await Post.find()
            .where(by, regex === 'true' ? RegExp(q) : q)
            .populate('author')
            .skip(Number(offset))
            .limit(Number(limit))
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', posts });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }
});

router.put('/:postId', filter, async (req, res) => {

    try {

        const target = await Post.findById(req.params.postId);
        if (!target) {
            throw new Error('포스트가 존재하지 않습니다');
        }
        if (req.user.id.toString() !== target.author.toString()) {
            throw new Error('권한이 부족합니다.');
        }
        const data = checkProperty(req.body, 'post', false);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        target.hashtags = data.data.content.match(/#([^\s`~!@#$%^&*()+=-]{2,})/g);
        if (data.data.content) target.content = data.data.content;
        const post = Post.findById((await target.save())._id).populate('author');
        return res.send({ message: 'SUCCESS', post });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

router.delete('/:postId', filter, async (req, res) => {

    try {

        const target = await Post.findById(req.params.postId);
        if (!target) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        if (req.user.id.toString() !== target.author.toString()) {
            throw new Error('권한이 부족합니다.');
        }
        await Comment.remove({ post: target.author });
        const post = await target.remove();
        return res.send({ message: 'SUCCESS', post });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

export default router;