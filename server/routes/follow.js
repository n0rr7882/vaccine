import { Router } from 'express';
import { filter } from '../tools/authentication';
import User from '../database/models/User';

const router = Router();

router.post('/', filter, async (req, res) => {

    try {

        if (!req.body || !req.body.targetId) {
            throw new Error('NEED_TARGET_ID');
        }
        const me = await User.findById(req.user.id);
        const target = await User.findById(req.body.targetId);
        if (!target) {
            throw new Error('TARGET_NOT_FOUND');
        }
        if (me.followings.indexOf(target._id) === -1) {
            me.followings.push(target._id);
        }
        if (target.followers.indexOf(me._id) === -1) {
            target.followers.push(me._id);
        }
        me.save();
        target.save();
        return res.send({ message: 'SUCCESS' });

    } catch ({ message }) {
        return res.send({ message });
    }

});

router.delete('/', filter, async (req, res) => {

    try {

        if (!req.body || !req.body.targetId) {
            throw new Error('NEED_TARGET_ID');
        }
        const me = await User.findById(req.user.id);
        const target = await User.findById(req.body.targetId);
        if (!target) {
            throw new Error('TARGET_NOT_FOUND');
        }
        me.followings.pull(target._id);
        target.followers.pull(me._id);
        me.save();
        target.save();
        return res.send({ message: 'SUCCESS' });

    } catch ({ message }) {
        return res.send({ message });
    }

});

export default router;