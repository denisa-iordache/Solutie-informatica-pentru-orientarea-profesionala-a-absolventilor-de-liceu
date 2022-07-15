const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const City = sequelize.define("city", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = City;
