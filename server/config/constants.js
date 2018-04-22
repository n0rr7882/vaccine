export default {
    PORT: 3000,
    LOG_FORMAT: 'dev',
    // DB_URL: 'mongodb://localhost/vaccine',
    // DB_URL: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ds233769.mlab.com:33769/vaccine-dev`,
    DB_URL: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@vaccine-dev-hvf7h.mongodb.net/test`,
    JWT_SALT: '~!@#$%^&*()_+Vaccine+_)(*&^%$#@!~'
};