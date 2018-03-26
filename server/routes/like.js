import { Router } from 'express';
import { filter } from '../tools/authentication';
import Post from '../database/models/Post';

const router = Router();

router.post('/:postId', filter, async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error('포스트가 존재하지 않습니다.');
        }
        if (!post.goods.includes(req.user.id)) {
            post.goods.push(req.user.id);
            await post.save();
        }
        return res.send({ message: 'SUCCESS' });

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
        post.goods.pull(req.user.id);
        await post.save();
        return res.send({ message: 'SUCCESS' });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

export default router;