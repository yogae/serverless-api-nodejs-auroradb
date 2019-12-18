const Sequelize = require('sequelize');
const config = {
    database: process.env.DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
}

let db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: process.env.DB_ENDPOINT,
    dialect: 'mysql'
});

db.sequelize = sequelize;
db.Image = require('../model/image')(sequelize, Sequelize);
module.exports = db;