const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const Faculty = sequelize.define("faculty", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link:{
    type: DataTypes.STRING,
  },
  taxa_anuala: {
    type: DataTypes.REAL,
  }
});

module.exports = Faculty;
