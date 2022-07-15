const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/db_licenta.db",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;