const { config } = require('../config/config');
const { Sequelize } = require('sequelize');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `${config.dbEngine}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// Se crea una instancia de Sequelize, ya gestiona el pooling.
const sequelize = new Sequelize(URI, {
  dialect: config.dbEngine, // saber el tipo de base de datos
  logging: (msg) => console.log(msg), // Logear en consola
});

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;
