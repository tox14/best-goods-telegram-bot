module.exports = async (bot, msg) => {
  await bot.sendMessage(
    msg.chat.id,
    "I don’t understand you. Choose some command!"
  );
};
