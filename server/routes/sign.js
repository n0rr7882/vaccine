import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../database/models/User';
import { filter } from '../tools/authentication';

const router = Router();

router.post('/', async (req, res) => {

    try {

        const signedUser = await User.findOne({ email: req.body.email });
        if (signedUser && signedUser.comparePassword(req.body.password)) {
            const token = sign({ id: signedUser._id }, constants.JWT_SALT);
            return res.send({ message: 'SUCCESS', token: token });
        } else throw new Error('INVALID_EMAIL_OR_PASSWORD');

    } catch (err) {
        return res.send({ message: err.message });
    }

});

router.get('/', filter, async (req, res) => {

    try {

        const user = await User.findById(req.user.id);
        return res.send({ message: 'SUCCESS', user });

    } catch (err) {
        return res.send({ message: err.message });
    }

});

export default router;