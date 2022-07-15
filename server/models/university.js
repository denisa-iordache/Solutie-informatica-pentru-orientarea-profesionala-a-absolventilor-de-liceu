const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const University = sequelize.define("university", {
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
    statut: {
    type: DataTypes.STRING,
  },
});

module.exports = University;
