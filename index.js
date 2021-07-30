require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api");

const token = process.env.TOKEN;

const bot = new TelegramApi(token, { polling: true });

bot.on("message", (message) => {
  bot.sendMessage(message.chat.id, `Your message: ${message.text}`);
});
