import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { join } from 'path';

import constants from './config/constants';

import { auth } from './tools/authentication';

import routes from './routes';

import './database/db';

const app = express();

app.disable('x-powered-by');

app.use(logger(constants.LOG_FORMAT));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/resources', express.static(join(__dirname, 'resources')));
app.use(express.static(join(__dirname, '..', 'dist')));
app.use(fileUpload());
// app.use(cors());

app.use(auth);

app.use('/api', routes);

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: join(__dirname, '..', 'dist') });
});

app.listen(constants.PORT, () => {
    console.log(`Server listen to port: ${constants.PORT}`);
});