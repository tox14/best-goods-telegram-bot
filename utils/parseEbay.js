const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async () => {
  const goods = [];
  const store = "eBay";

  const response = await axios.get("https://www.ebay.com/globaldeals");
  const $ = cheerio.load(response.data);

  // Add spotlight deal
  goods.push({
    store,
    url: $(".ebayui-dne-summary-card__wrapper > div > a").attr("href"),
    title: $(".dne-itemtile-title .ebayui-ellipsis-3").text(),
    image: $(".ebayui-dne-summary-card__wrapper img").attr("src"),
    price: $(".ebayui-dne-summary-card__wrapper span[itemprop='price']")
      .text()
      .split(" ")[1],
    discount: "",
  });

  // Add featured deals
  $(".ebayui-dne-item-featured-card div[data-listing-id]").each((_, el) => {
    const url = $(el).find(".dne-itemtile-detail > a").attr("href");
    const title = $(el).find(".dne-itemtile-title").attr("title");
    const image = $(el).find(".slashui-image-cntr img").attr("src");
    const price = $(el).find("span[itemprop='price']").text().split(" ")[1];
    const discount = $(el)
      .find(".dne-itemtile-original-price .itemtile-price-bold")
      .text();
    goods.push({
      store,
      url,
      title,
      image,
      price,
      discount,
    });
  });

  return goods;
};
