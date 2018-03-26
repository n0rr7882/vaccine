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

        const { limit, offset, by, q } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        if (!(by && q)) {
            throw new Error('BY_OR_Q_NOT_EXIST');
        }
        const posts = await Post.find()
            .where(by, RegExp(q))
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

        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다');
        }
        if (req.user.id.toString() !== post.author.toString()) {
            throw new Error('권한이 부족합니다.');
        }
        const data = checkProperty(req.body, 'post', false);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        post.hashtags = data.data.content.match(/#([^\s`~!@#$%^&*()+=-]{2,})/g);
        if (data.data.content) post.content = data.data.content;
        const result = Post.findById((await post.save())._id).populate('author');
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

router.delete('/:postId', filter, async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        if (req.user.id.toString() !== post.author.toString()) {
            throw new Error('권한이 부족합니다.');
        }
        await Comment.remove({ post: post.author });
        const result = await post.remove();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

export default router;