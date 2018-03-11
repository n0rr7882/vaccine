import express from 'express';
import error from './error';

import sign from './sign';
import user from './user';
import post from './post';
import comment from './comment';
import friends from './friends';

const router = express.Router();

router.use('/sign', sign);
router.use('/users', user);
router.use('/posts', post);
router.use('/comments', comment);
router.use('/friends', friends);
router.use(error);

export default router;