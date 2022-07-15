const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const PostSecondarySchool = sequelize.define("postSecondarySchool", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taxa_anuala: {
    type: DataTypes.FLOAT,
  },
  link:{
    type: DataTypes.STRING,
  }

});

module.exports = PostSecondarySchool;
