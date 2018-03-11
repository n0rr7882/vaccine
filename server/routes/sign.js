import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../database/models/User';

const router = Router();

router.post('/', async (req, res) => {

    try {

        const signedUser = await User.findOne({ email: req.body.email });
        if (signedUser && signedUser.comparePassword(req.body.password)) {
            const token = sign({ id: signedUser }, constants.JWT_SALT);
            res.send({ message: 'SUCCESS', token: token });
        } else throw new Error('INVALID_EMAIL_OR_PASSWORD');

    } catch (err) {
        console.error(err);
        res.send({ message: err.message });
    }

});

router.get('/', async (req, res) => {

});

export default router;