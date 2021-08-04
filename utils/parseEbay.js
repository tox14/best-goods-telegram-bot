const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async () => {
  try {
    const goods = [];
    const store = "eBay";

    const response = await axios.get("https://www.ebay.com/globaldeals", {
      headers: {
        "Accept-Language": "en-US,en",
      },
    });
    const $ = cheerio.load(response.data);

    $("[data-listing-id]").each((_, el) => {
      let url = $(el).find(".dne-itemtile-detail > a").attr("href");
      if (url && url.split("?")[0]) {
        url = url.split("?")[0];
      }

      const title = $(el).find(".dne-itemtile-title").attr("title");
      const image =
        $(el).find("img").attr("data-config-src") ||
        $(el).find("img").attr("src");
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
  } catch (error) {
    console.error("eBay parse ERROR: " + error);
    return [];
  }
};
