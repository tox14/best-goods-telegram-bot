module.exports = async (bot, message) => {
  bot.sendMessage(message.chat.id, `Your message: ${message.text}`);
};
