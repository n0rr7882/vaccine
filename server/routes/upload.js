import { Router } from 'express';
import multer from 'multer';
import { filter } from '../tools/authentication';
import gm from 'gm';

const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../resources/thumbnails-original`);
        },
        filename: (req, file, cb) => {
            cb(null, `original_${req.user.id}`);
        }
    })
});

router.post('/thumbnail', filter, upload.any(), async (req, res) => {

    try {

        gm(`${__dirname}/../resources/thumbnails-original/original_${req.user.id}`)
            .noProfile()
            .thumb(100, 100, `${__dirname}/../resources/thumbnails/${req.user.id}.jpg`, err => {
                return res.send({ message: 'SUCCESS', url: `/resources/thumbnails/${req.user.id}.jpg` });
            });

    } catch ({ message }) {
        return res.status(400).send({ message });
    }

});

export default router;