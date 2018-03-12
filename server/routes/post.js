import { Router } from 'express';
import Post from '../database/models/Post';
import { filter } from '../tools/authentication';
import { checkProperty } from '../tools/validator';

const router = Router();

router.post('/', filter, async (req, res) => {

    try {

        const data = checkProperty(req.body, 'post', true);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        data.data.hashtags = data.data.contents.match(/#([^\s`~!@#$%^&*()+=-]{2,})/g);
        data.data.authorId = req.user.id;
        const post = await Post.create(data.data);
        return res.send({ message: 'SUCCESS', post });

    } catch ({ message }) {
        return res.send({ message });
    }

});


router.get('/:postId', async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId)
            .populate('author')
            .populate('comments');
        return res.send({ message: 'SUCCESS', post });

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
        const posts = await Post.find()
            .where(by, RegExp(q))
            .skip(offset)
            .limit(limit)
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', posts });

    } catch ({ message }) {
        return res.send({ message });
    }
});

router.put('/:postId', filter, async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId);
        if (req.user.id.toString() !== post.author.toString()) {
            throw new Error('ACCESS_DENIED');
        }
        const data = checkProperty(req.body, 'post', false);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        post.hashtags = data.data.contents.match(/#([^\s`~!@#$%^&*()+=-]{2,})/g);
        if (data.data.contents) post.contents = data.data.contents;
        if (data.data.title) post.title = data.data.title;
        const result = await post.save();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.delete('/:postId', filter, async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error('POST_NOT_FOUND');
        if (req.user.id.toString() !== post.author) {
            throw new Error('ACCESS_DENIED');
        }
        const result = await post.destroy();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send({ message });
    }

});

export default router;