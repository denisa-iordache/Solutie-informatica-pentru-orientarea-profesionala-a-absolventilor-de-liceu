const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const Specialization = sequelize.define("specialization", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numar_locuri_buget: {
    type: DataTypes.INTEGER,
  },
  numar_locuri_taxa: {
    type: DataTypes.INTEGER,
  },
  ultima_medie_buget: {
    type: DataTypes.REAL,
  },
  ultima_medie_taxa: {
    type: DataTypes.REAL,
  }
});

module.exports = Specialization;
