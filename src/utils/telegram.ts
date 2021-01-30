import { debounce } from "lodash";
import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

export const sendTelegramMessage = (message: string) => {
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
};

export const sendTelegramMessageDebounce = debounce(
  sendTelegramMessage,
  5 * 60 * 1000,
  {
    leading: true,
    trailing: false,
  }
);
