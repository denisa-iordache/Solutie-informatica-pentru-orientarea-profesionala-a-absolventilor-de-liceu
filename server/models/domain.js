const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const Domain = sequelize.define("domain", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement:true,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Domain;
