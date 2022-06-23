const { config } = require('../config/config');
const { Sequelize } = require('sequelize');
const setupModels = require('./../db/models');

// let URI = '';
// if (config.isProd) {
//   URI = config.dbUrl;
// } else {
//   const USER = encodeURIComponent(config.dbUser);
//   const PASSWORD = encodeURIComponent(config.dbPassword);
//   URI = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// }

// Se crea una instancia de Sequelize, ya gestiona el pooling.

const options = {
  dialect: config.dbEngine, // saber el tipo de base de datos
  logging: config.isProd ? false : (msg) => console.log(msg), // Logs en consola
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;
