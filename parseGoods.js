const { Op } = require("sequelize");
const User = require("./models/User.model");
const Goods = require("./models/Goods.model");
const { parseEbay, filterOldGoods } = require("./utils");
const { GoodsView } = require("./views");

module.exports = async (bot) => {
  setInterval(async () => {
    const users = await User.findAll({
      where: { monitoring: true, [Op.or]: [{ amazon: true }, { ebay: true }] },
      raw: true,
    });

    const ebayGoods = await parseEbay();

    const goods = await filterOldGoods(ebayGoods);

    await Goods.bulkCreate(goods);

    goods.forEach((item) => {
      users.forEach((user) => {
        if (user[item.store.toLowerCase()]) {
          GoodsView(bot, user.chatId, item);
        }
      });
    });
  }, 1 * 60 * 1000);
};
