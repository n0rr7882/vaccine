import { Router } from 'express';
import Post from '../database/models/Post';
import User from '../database/models/User';
import { filter } from '../tools/authentication';

const router = Router();


router.get('/followings-posts', filter, async (req, res) => {

    try {

        const { limit, offset } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        const me = await User.findById(req.user.id);
        const posts = await Post.find()
            .where('author')
            .in([req.user.id.toString(), ...me.followers.map(item => item.toString())])
            .populate('author')
            .skip(Number(offset))
            .limit(Number(limit))
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', posts });

    } catch ({ message }) {
        return res.send(400, { message });
    }
});

router.get('/liked-posts', filter, async (req, res) => {

    try {

        const { limit, offset } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        const posts = await Post.find()
            .where('goods', req.user.id.toString())
            .populate('author')
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', posts });

    } catch ({ message }) {
        return res.send(400, { message });
    }
});

router.get('/commented-posts', filter, async (req, res) => {

    try {

        const { limit, offset } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        const posts = await Post.find()
            .where('comments.author', req.user.id.toString())
            .populate('author')
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', posts });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

router.get('/my-posts', filter, async (req, res) => {

    try {

        const { limit, offset } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        const posts = await Post.find()
            .where('author', req.user.id.toString())
            .populate('author')
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', posts });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

router.get('/me', filter, async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .populate('followers')
            .populate('followings')
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', user });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

export default router;