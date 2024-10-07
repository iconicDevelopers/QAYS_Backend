const {
  CONTACT_METHOS,
  ERROR_MSG_FOR_SEND_MESSAGE,
  ERROR_MSG_FOR_INVALID_CONTACT_METHODS,
} = require("./constant");
const { logger } = require("./logger");
const {
  sendMessageToMail,
  sendMessageToTelegram,
  sendMessageToWhatsapp,
} = require("../helpers/commonHelper");
require("dotenv").config();

/**
 * Sends a message to a Telegram chat using the Telegram Bot API
 * @param {Object} data - The data to send
 * @param {string} data.name - The name of the person submitting the form
 * @param {string} data.email - The email of the person submitting the form
 * @param {string} data.mobile - The mobile phone number of the person submitting the form
 * @param {string} data.message - The message from the person submitting the form
 * @param {string} data.contactMethod - The preferred contact method of the person submitting the form
 * @param {string[]} data.selectedDates - The preferred dates of the person submitting the form
 * @returns {Promise<void>}
 * @throws {Error} - If the message fails to send
 */
const contactsService = async ({
  name,
  email,
  mobile,
  message,
  contactMethod,
  selectedDates,
}) => {
  try {
    switch (contactMethod) {
      case CONTACT_METHOS.TELEGRAM:
        await sendMessageToTelegram(
          name,
          email,
          mobile,
          message,
          contactMethod,
          selectedDates
        );
        break;
      case CONTACT_METHOS.EMAIL:
        await sendMessageToMail(
          name,
          email,
          mobile,
          message,
          contactMethod,
          selectedDates
        );
      case CONTACT_METHOS.WHATSAPP:
        await sendMessageToWhatsapp(
          name,
          email,
          mobile,
          message,
          contactMethod,
          selectedDates
        );
        break;
      default:
        logger.error(ERROR_MSG_FOR_INVALID_CONTACT_METHODS);
        throw new Error(ERROR_MSG_FOR_INVALID_CONTACT_METHODS);
    }
  } catch (err) {
    logger.error(`${ERROR_MSG_FOR_SEND_MESSAGE} : ${err.message}`);
    throw new Error(`${ERROR_MSG_FOR_SEND_MESSAGE} : ${err.message}`);
  }
};
module.exports = { contactsService };
