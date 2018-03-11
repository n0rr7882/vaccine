import { verify } from 'jsonwebtoken';
import constants from '../config/constants';

export function auth(req, res, next) {
    if (req.headers.authorization) {
        verify(req.headers.authorization, constants.JWT_SALT, (err, decoded) => {
            if (!err && decoded) {
                req.user = decoded;
            }
        });
    }
    return next();
};

export function filter(req, res, next) {
    if (req.user && req.user.id) {
        return next();
    }
    return res.send({ message: 'ACCESS_DENIED' });
}