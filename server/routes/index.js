import express from 'express';
import error from './error';

import user from './user';
import post from './post';

const router = express.Router();

router.use('/users', user);
router.use('/posts', post);
router.use(error);

export default router;