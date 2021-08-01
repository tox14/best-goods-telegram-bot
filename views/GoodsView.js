module.exports = (bot, chatId, goods) => {
  if (!goods.title || !goods.image || !goods.price || !goods.url) {
    return;
  }

  let caption = `*${goods.title}*\n\n🏪 Store: *${goods.store}*\n🏷️ Price: *${goods.price}*`;
  if (goods.discount) {
    caption += `\n💥 Discount: *${goods.discount}*`;
  }

  const options = {
    caption,
    parse_mode: "markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open link",
            url: goods.url,
          },
        ],
      ],
    },
  };

  bot.sendPhoto(chatId, goods.image, options);
};
