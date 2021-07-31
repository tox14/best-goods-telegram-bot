const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  chatId: {
    type: DataTypes.INTEGER,
  },
  monitoring: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = User;
