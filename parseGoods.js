const { Op } = require("sequelize");
const User = require("./models/User.model");
const Goods = require("./models/Goods.model");
const { parseEbay, parseAmazon, filterOldGoods } = require("./utils");
const { GoodsView } = require("./views");

module.exports = async (bot) => {
  setInterval(async () => {
    try {
      const users = await User.findAll({
        where: {
          monitoring: true,
          [Op.or]: [{ amazon: true }, { ebay: true }],
        },
        raw: true,
      });

      const ebayGoods = await parseEbay();
      const amazonGoods = await parseAmazon();

      const goods = await filterOldGoods(ebayGoods, amazonGoods);

      await Goods.bulkCreate(goods);
      goods.forEach((item) => {
        users.forEach((user) => {
          if (user[item.store.toLowerCase()]) {
            GoodsView(bot, user.chatId, item);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }, 5 * 60 * 1000);
};
