const User = require("../models/User.model");

module.exports = async (bot, mgs) => {
  const chatId = mgs.chat.id;

  const user = await User.findOne({ where: { chatId } });
  if (user) {
    user.monitoring = false;
    await user.save();
  }

  await bot.sendMessage(chatId, "Monitoring paused.\nHope to see you again!");
};
