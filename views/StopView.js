module.exports = async (bot, message) => {
  await bot.sendMessage(
    message.chat.id,
    "Monitoring paused.\nHope to see you again!"
  );
};
