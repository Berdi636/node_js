const { config } = require('dotenv')

config()

const env = {
    host: process.env.HOST,
    port: process.env.PORT,
    db_host: process.env.DB_HOST,
    db_port: +process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
    access_key: process.env.ACCESS_KEY,
    access_time: process.env.ACCESS_TIME,
    refresh_key: process.env.REFRESH_KEY,
    refresh_time: process.env.REFRESH_TIME
}

module.exports = {
    env
}

