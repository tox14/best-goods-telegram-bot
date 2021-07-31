const User = require("../models/User.model");

module.exports = async (bot, msg) => {
  const chatId = msg.chat.id;
  const options = {
    parse_mode: "markdown",
    // reply_markup: JSON.stringify({
    //   keyboard: [["⚙️ Settings"]],
    //   resize_keyboard: true,
    // }),
  };

  const user = await User.findOne({ where: { chatId } });

  if (!user) {
    await User.create({ chatId });
  } else {
    user.monitoring = true;
    await user.save();
  }

  bot.sendMessage(
    chatId,
    `
      *Hello, ${msg.from.first_name} ${msg.from.last_name}!*
      \nI have turned on the monitoring of the top offers in online stores for you. You can configure the monitoring parameters by going to the bot settings.
    `,
    options
  );
};
