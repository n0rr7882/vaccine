import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../database/models/User';
import { filter } from '../tools/authentication';

const router = Router();

router.post('/', async (req, res) => {

    try {

        const user = (await User.login(req.body.email, req.body.password))[0];
        if (!user) {
            throw new Error('INVALID_EMAIL_OR_PASSWORD');
        }
        const token = sign({ id: user._id }, constants.JWT_SALT);
        return res.send({ message: 'SUCCESS', token: token });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

export default router;