import { Router } from 'express';
import User from '../database/models/User';
import { checkProperty } from '../tools/validator';
import { filter } from '../tools/authentication';

const router = Router();

router.post('/', async (req, res) => {

    try {

        if ((await User.findOne({ email: req.body.email }))) {
            throw new Error('EMAIL_ALREADY_EXIST');
        }
        const data = checkProperty(req.body, 'user', true);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        const user = await User.create(data.data);
        return res.send({ message: 'SUCCESS', user });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.get('/:username', async (req, res) => {

    try {

        const user = await User.findOne({ username: req.params.username });
        return res.send({ message: 'SUCCESS', user });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.get('/', async (req, res) => {

    try {

        const { limit, offset, q } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        const users = await User
            .find({ $or: [{ username: { $regex: q } }, { email: { $regex: q } }] }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .limit(Number(limit))
            .skip(Number(offset));

        return res.send({ message: 'SUCCESS', users });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.put('/:userId', filter, async (req, res) => {

    try {

        const user = await User.findById(req.params.userId);
        if (!user) throw new Error('USER_NOT_FOUND');
        if (req.user.id.toString() !== user._id.toString()) {
            throw new Error('ACCESS_DENIED');
        }
        const data = checkProperty(req.body, 'user', false);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        const { username, password } = data.data;
        const result = await User.update({ _id: req.params.userId }, { username, password });
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.delete('/:userId', filter, async (req, res) => {

    try {

        const user = await User.findById(req.params.userId);
        if (!user) throw new Error('USER_NOT_FOUND');
        if (req.user.id.toString() !== user._id) {
            throw new Error('ACCESS_DENIED');
        }
        const result = await user.destroy();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send({ message });
    }

});

export default router;