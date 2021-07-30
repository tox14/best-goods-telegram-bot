module.exports = async (bot, msg) => {
  const example = {
    title:
      "Temdan Clear Case Compatible with iPhone 12 Case/Compatible with iPhone 12 Pro Case - Clear",
    url: "https://www.amazon.com/Temdan-Clear-Case-Compatible-iPhone/dp/B08ND1M93J/ref=gbps_img_m-9_475e_9698627a?smid=A1C0JIAA5C53G7&pf_rd_p=5d86def2-ec10-4364-9008-8fbccf30475e&pf_rd_s=merchandised-search-9&pf_rd_t=101&pf_rd_i=15529609011&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=W77VTP1SJA166KBZ80QZ",
    image: "https://m.media-amazon.com/images/I/71xrgPIhjzL._AC_SX679_.jpg",
    price: "40$",
    discount: "90%",
  };

  const options = {
    caption: `*${example.title}*\n\n🏪 Store: *Amazon*\n⭐️ Rating: *4.7* out of 5 \n🏷️ Price: *${example.price}*\n💥 Discount: *${example.discount}*`,
    parse_mode: "markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open link",
            url: example.url,
          },
        ],
      ],
    },
  };

  bot.sendPhoto(msg.chat.id, example.url, options);
};
