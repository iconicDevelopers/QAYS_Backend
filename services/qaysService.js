const { default: axios } = require("axios");
const { Logger } = require("logger");
require("dotenv").config();

const qaysService = async () => {
  try {
    const token = process.env.TELEGRAM_TOKEN;
    const telegramMessage = `New submission`;
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    const url = "";
    const params = {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: telegramMessage,
    };
    const response = await axios.post(telegramUrl, params);

    if (response.status !== 200) {
      throw new Error("Failed to send message");
    }
  } catch (err) {
    Logger.error(err);
    throw new Error("Failed to send message");
  }
};
module.exports = qaysService;
