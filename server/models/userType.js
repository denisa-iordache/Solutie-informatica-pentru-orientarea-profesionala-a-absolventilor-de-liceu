const sequelize = require("../sqlite/sequelize");
const { DataTypes } = require("sequelize");

const UserType = sequelize.define("userType", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tip_utilizator: {
    type: DataTypes.ENUM({
      values: ["STANDARD", "PREMIUM", "ADMIN"],
    }),
    validate: {
      isIn: {
        args: [["STANDARD", "PREMIUM", "ADMIN"]],
        msg: "Valorile permise pentru acest camp sunt: STANDARD, PREMIUM, ADMIN.",
      },
    },
  },
});

module.exports = UserType;
