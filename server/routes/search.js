import { Router } from 'express';
import User from '../database/models/User';
import { checkProperty } from '../tools/validator';
import { filter } from '../tools/authentication';

const router = Router();

router.get('/users', async (req, res) => {

    try {

        const { limit, offset, q } = req.query;
        if (!(limit && offset)) {
            throw new Error('LIMIT_OR_OFFSET_NOT_EXIST');
        }
        if (!q) {
            throw new Error('QUERY_Q_NOT_EXIST');
        }
        const users = await User
            .find({ $or: [{ username: { $regex: RegExp(q, 'i') } }, { email: { $regex: RegExp(q, 'i') } }] }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .limit(Number(limit))
            .skip(Number(offset));

        return res.send({ message: 'SUCCESS', users });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

export default router;