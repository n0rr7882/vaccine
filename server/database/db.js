import mongoose from 'mongoose';

import constants from '../config/constants';

const db = mongoose.connection;

db.on('error', err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
});

db.once('open', () => {
    console.log('✓ DB connection success.');
});

mongoose.set('debug', true)

mongoose.connect(constants.DB_URL);
mongoose.Promise = global.Promise;