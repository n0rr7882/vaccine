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

    } catch (err) {
        return res.send({ message: err.message });
    }

});

router.get('/:username', async (req, res) => {

    try {

        if (!req.params.username) {
            throw new Error('INVALID_USERNAME');
        }
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }
        return res.send({ message: 'SUCCESS', user });

    } catch (err) {
        return res.send({ message: err.message });
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

    } catch (err) {
        return res.send({ message: err.message });
    }

});

router.put('/', filter, async (req, res) => {

    try {

        if ((await User.findOne({ email: req.body.email }))) {
            throw new Error('EMAIL_ALREADY_EXIST');
        }
        const data = checkProperty(req.body, 'user', false);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        const user = await User.create(data.data);
        return res.send({ message: 'SUCCESS', user });

    } catch (err) {
        return res.send({ message: err.message });
    }

});

router.delete('/', filter, async (req, res) => {

    try {

        const user = await User.findById(req.user.id);
        if (!user) throw new Error('USER_NOT_FOUND');
        await user.destroy();
        return res.send({ message: 'SUCCESS' });

    } catch (err) {
        return res.send({ message: err.message });
    }

});

export default router;