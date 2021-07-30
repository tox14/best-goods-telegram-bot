const TelegramApi = require("node-telegram-bot-api");
const sequalize = require("./database");
const { StartView } = require("./views");

const token = process.env.TOKEN;
let bot;
if (process.env.NODE_ENV === "production") {
  bot = new TelegramApi(token);
  bot.setWebHook(process.env.WEBSITE_URL + bot.token);
} else {
  bot = new TelegramApi(token, { polling: true });
}

const start = async () => {
  try {
    // Connect to database
    await sequalize.authenticate();
    await sequalize.sync();

    bot.on("message", async (msg) => {
      switch (msg.text) {
        case "/start":
          await StartView(bot, msg);
          break;
        default:
          break;
      }
    });

    bot.on("error", (err) => console.error("error", err));
    bot.on("polling_error", (err) => console.error("polling_error", err));
  } catch (err) {
    console.error(err);
  }
};

start();

module.exports = bot;
