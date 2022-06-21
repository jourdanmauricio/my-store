const { config } = require('../config/config');
const { Sequelize } = require('sequelize');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// Se crea una instancia de Sequelize, ya gestiona el pooling.
const sequelize = new Sequelize(URI, {
  dialect: 'postgres', // saber el tipo de base de datos
  logging: (msg) => console.log(msg), // Logear en consola
});

module.exports = sequelize;
