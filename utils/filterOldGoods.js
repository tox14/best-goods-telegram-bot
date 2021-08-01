const Goods = require("../models/Goods.model");

module.exports = async (...sources) => {
  let allGoods = [];
  const newGoods = [];
  sources.forEach((source) => {
    if (Array.isArray(source)) {
      allGoods = allGoods.concat(source);
    }
  });
  const existGoods = await Goods.findAll({ raw: true });

  allGoods.forEach((item) => {
    const isExist = existGoods.some(
      ({ title, price }) => title === item.title && price === item.price
    );
    if (!isExist) {
      newGoods.push(item);
    }
  });

  return newGoods;
};
