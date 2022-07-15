const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const BranchOfScience = sequelize.define("branchOfScience", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = BranchOfScience;
