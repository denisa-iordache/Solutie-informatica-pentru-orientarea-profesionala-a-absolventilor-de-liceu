const { Sequelize } = require("sequelize");
const dbConfig = require('./db-config')
const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  define: {
    timestamps: false,
  },
},

);

module.exports = sequelize;
