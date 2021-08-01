const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Goods = sequelize.define("goods", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  store: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.STRING,
  },
});

module.exports = Goods;
