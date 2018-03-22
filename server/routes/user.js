import { Router } from 'express';
import User from '../database/models/User';
import { checkProperty } from '../tools/validator';
import { filter } from '../tools/authentication';

const router = Router();

router.post('/', async (req, res) => {

    try {

        if ((await User.findOne({ email: req.body.email }))) {
            throw new Error('이미 등록 된 이메일입니다.');
        }
        const data = checkProperty(req.body, 'user', true);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        const user = await User.create(data.data);
        user.password = user.__v = undefined;
        return res.send({ message: 'SUCCESS', user });

    } catch (err) {
        console.error(err);
        return res.send(400, { message: err.message });
    }

});

router.get('/:userId', async (req, res) => {

    try {

        const user = await User.findById(req.params.userId)
            .populate('followers')
            .populate('followings');
        if (!user) {
            throw new Error('계정이 존재하지 않습니다.');
        }
        return res.send({ message: 'SUCCESS', user });

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
        const users = await User.find()
            .where(by, RegExp(q))
            .populate('followers')
            .populate('followings')
            .skip(Number(offset))
            .limit(Number(limit))
            .sort('-createdAt');
        return res.send({ message: 'SUCCESS', users });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

router.put('/:userId', filter, async (req, res) => {

    try {

        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new Error('계정이 존재하지 않습니다.');
        }
        if (req.user.id.toString() !== user._id.toString()) {
            throw new Error('권한이 부족합니다.');
        }
        if (req.body.email && (await User.findOne({ email: req.body.email }))) {
            throw new Error('이미 등록 된 이메일입니다.');
        }
        const data = checkProperty(req.body, 'user', false);
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message);
        }
        if (data.data.email) user.email = data.data.email;
        if (data.data.username) user.username = data.data.username;
        if (data.data.password) user.password = data.data.password;
        const result = await user.save();
        result.password = undefined;
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

router.delete('/:userId', filter, async (req, res) => {

    try {

        const user = await User.findById(req.params.userId);
        if (!user) throw new Error('계정이 존재하지 않습니다.');
        if (req.user.id.toString() !== user._id.toString()) {
            throw new Error('권한이 부족합니다.');
        }
        const result = await user.remove();
        return res.send({ message: 'SUCCESS', result });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

export default router;