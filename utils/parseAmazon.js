const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

module.exports = async () => {
  try {
    const goods = [];
    const store = "Amazon";

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.amazon.com/gp/goldbox");
    const content = await page.content();

    const $ = cheerio.load(content);
    $("[data-deal-id]").each((_, el) => {
      const isProduct = $(el).find(
        "[data-testid='link-review-component']"
      ).length;
      if (isProduct) {
        const urlText = $(el).find(".a-link-normal").attr("href");
        let url = urlText;
        if (urlText.includes("slredirect")) {
          url = decodeURIComponent(urlText.split("url=")[1]);
        }
        url = url.split("?")[0];

        const title = $(el).find(".a-link-normal.a-color-base > div").text();
        const image = $(el).find(".a-image-container img").attr("src");
        const price = $(el).find("[data-a-size='l']").text().split(": ")[1];

        let discount = "";
        const discountText = $(el)
          .find(".a-spacing-micro > span.a-size-small")
          .text();
        if (discountText) {
          discount = discountText.split(": ")[1].split(" ")[1] + " off";
        }

        let rating = "";
        const ratingText = $(el)
          .find("[data-testid='review-stars']")
          .attr("class");
        if (ratingText) {
          const stars = ratingText.split("a-star-mini-")[1];
          rating = stars ? stars[0] : "";
        }

        goods.push({
          store,
          url,
          title,
          image,
          price,
          discount,
          rating,
        });
      }
    });

    browser.close();

    return goods;
  } catch (error) {
    console.error("Amazon parse ERROR: " + error);
    return [];
  }
};
