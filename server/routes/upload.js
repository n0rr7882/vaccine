import { Router } from 'express';
import { filter } from '../tools/authentication';
import gm from 'gm';

const router = Router();

router.post('/thumbnail', filter, async (req, res) => {

    try {

        if (!req.files || !req.files.thumbnail) {
            throw new Error('NEED_FILES_THUMBNAIL');
        }
        if (!(/image\/jpeg|image\/png/.test(req.files.thumbnail.mimetype))) {
            throw new Error('INVALID_FILE_TYPE');
        }
        await req.files.thumbnail.mv(`${__dirname}/../resources/thumbnails-original/original_${req.user._id}`);
        gm(`${__dirname}/../resources/thumbnails-original/original_${req.user.id}`)
            .noProfile()
            .thumb(100, 100, `${__dirname}/../resources/thumbnails/${req.user.id}.jpg`, err => {
                return res.send({ message: 'SUCCESS', url: `/resources/thumbnails/${req.user.id}.jpg` });
            });

    } catch ({ message }) {
        return res.send({ message });
    }

});

export default router;