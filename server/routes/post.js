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

        const post = await Post.findById(req.params.postId);
        return res.send({ message: 'SUCCESS', post });

    } catch ({ message }) {
        return res.send({ message });
    }
});

router.get('/', async (req, res) => {

    try {
        const { offset, limit, q, } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
    } catch ({ message }) {
        res.send({ message });
    }

});

router.put('/', filter, async (req, res) => {

});

router.delete('/', filter, async (req, res) => {

});

export default router;