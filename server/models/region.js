const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const Region = sequelize.define("region", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Region;
