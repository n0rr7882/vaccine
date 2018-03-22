import { Router } from 'express';
import { filter } from '../tools/authentication';
import gm from 'gm';

const router = Router();

router.post('/thumbnail', filter, async (req, res) => {

    try {

        if (!req.files || !req.files.thumbnail) {
            throw new Error('썸네일 사진이 필요합니다.');
        }
        if (!(/image\/jpeg|image\/png/.test(req.files.thumbnail.mimetype))) {
            throw new Error('사진 형식이 유효하지 않습니다.');
        }
        await req.files.thumbnail.mv(`${__dirname}/../resources/thumbnails-original/original_${req.user._id}`);
        gm(`${__dirname}/../resources/thumbnails-original/original_${req.user.id}`)
            .noProfile()
            .thumb(100, 100, `${__dirname}/../resources/thumbnails/${req.user.id}.jpg`, err => {
                return res.send({ message: 'SUCCESS', url: `/resources/thumbnails/${req.user.id}.jpg` });
            });

    } catch ({ message }) {
        return res.send(400, { message });
    }

});

export default router;