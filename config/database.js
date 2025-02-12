const config = require('./config.js')
const { Sequelize } = require('sequelize')

const { host, username, password, database, port, logging, dialect } =
    config.env === 'development' ? config.development : config.production

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    port: parseInt(port),
    logging,
    dialectOptions: {
        timezone: 'Asia/Jakarta', // Timezone untuk PostgreSQL
    },
    define: {
        timestamps: true, 
    },
});

const db = {
    host,
    username,
    password,
    database,
    port,
    dialect
}

module.exports = { db, sequelize }
