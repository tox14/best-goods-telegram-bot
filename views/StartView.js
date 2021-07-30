module.exports = async (bot, msg) => {
  const options = {
    parse_mode: "markdown",
    // reply_markup: JSON.stringify({
    //   keyboard: [["⚙️ Settings"]],
    //   resize_keyboard: true,
    // }),
  };

  bot.sendMessage(
    msg.chat.id,
    `
      *Hello, ${msg.from.first_name} ${msg.from.last_name}!*
      \nI have turned on the monitoring of the top offers in online stores for you. You can configure the monitoring parameters by going to the bot settings.
    `,
    options
  );
};
