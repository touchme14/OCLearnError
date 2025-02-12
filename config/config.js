require('dotenv').config()

const config = {
    env: process.env.NODE_ENV,
    secret: process.env.SECRET,
    port: process.env.PORT,
    title: process.env.APP_TITLE,
    logo: process.env.APP_LOGO,
    session_expire: parseInt(process.env.SESSION_EXPIRE),
    useDb: process.env.USE_DB,
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: process.env.DB_DRIVER,
        dialectOptions: {
            bigNumberStrings: true
        },
        logging: (process.env.DB_LOGGING === 'true'),
        seederStorage: 'sequelize',
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        // dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        },
        logging: (process.env.DB_LOGGING === 'true'),
        seederStorage: 'sequelize',
    }
};

module.exports = config