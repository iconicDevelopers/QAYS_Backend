const axios = require("axios");
const nodemailer = require("nodemailer");
const {
  ERROR_MSG_FOR_TELEGRAM,
  ERROR_MSG_FOR_MAIL,
  ERROR_MSG_FOR_WHATSAPP,
} = require("../services/constant");
const { logger } = require("../services/logger");
require("dotenv").config();

/**
 * Returns a string representing an email template for a contact request
 * @param {string} name - The name of the person submitting the form
 * @param {string} email - The email of the person submitting the form
 * @param {string} mobile - The mobile phone number of the person submitting the form
 * @param {string} message - The message from the person submitting the form
 * @param {string} contactMethod - The preferred contact method of the person submitting the form
 * @param {string[]} selectedDates - The preferred dates of the person submitting the form
 * @returns {string}
 */
const emailTemplate = (
  name,
  email,
  mobile,
  message,
  contactMethod,
  selectedDates
) => {
  return `  *New Contact Request*
  *Name:* ${name}
  *Email:* ${email}
  *Mobile:* ${mobile}
  *Message:* ${message}
  *Contact Method:* ${contactMethod}
  *Preferred Dates:* ${selectedDates.join(", ")}
  `;
};
/**
 * Sends a message to a Telegram chat using the Telegram Bot API
 * @param {string} name - The name of the person submitting the form
 * @param {string} email - The email of the person submitting the form
 * @param {string} mobile - The mobile phone number of the person submitting the form
 * @param {string} message - The message from the person submitting the form
 * @param {string} contactMethod - The preferred contact method of the person submitting the form
 * @param {string[]} selectedDates - The preferred dates of the person submitting the form
 * @returns {Promise<void>}
 * @throws {Error} - If the message fails to send
 */
const sendMessageToTelegram = async (
  name,
  email,
  mobile,
  message,
  contactMethod,
  selectedDates
) => {
  try {
    /** Prepare for api params */
    const params = {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: emailTemplate(
        name,
        email,
        mobile,
        message,
        contactMethod,
        selectedDates
      ),
      parse_mode: "Markdown", // Enables markdown for formatting
    };

    /** Send api request */
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      params
    );

    /** If the response status is not 200, throw an error */
    if (response.status !== 200) {
      logger.error(`${ERROR_MSG_FOR_TELEGRAM} : ${response.statusText}`);
      throw new Error(`${ERROR_MSG_FOR_TELEGRAM} : ${response.statusText}`);
    } else {
      return `Thank you for choosing us! We will get back on Telegram ${mobile} shortly.`;
    }
  } catch (error) {
    logger.error(`${ERROR_MSG_FOR_TELEGRAM} : ${error.message}`);
    throw new Error(`${ERROR_MSG_FOR_TELEGRAM} : ${error.message}`);
  }
};

/**
 * Sends a message to an email address using a Gmail account
 * @param {string} name - The name of the person submitting the form
 * @param {string} email - The email of the person submitting the form
 * @param {string} mobile - The mobile phone number of the person submitting the form
 * @param {string} message - The message from the person submitting the form
 * @param {string} contactMethod - The preferred contact method of the person submitting the form
 * @param {string[]} selectedDates - The preferred dates of the person submitting the form
 * @returns {Promise<void>}
 * @throws {Error} - If the message fails to send
 */
const sendMessageToMail = (
  name,
  email,
  mobile,
  message,
  contactMethod,
  selectedDates
) => {
  try {
    /** Create on object for nodemailer */
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /** Preapre mail options */
    let mailOptions = {
      from: email,
      to: process.env.TO_EMAIL,
      subject: `New Consultation Request from ${name}`,
      text: emailTemplate(
        name,
        email,
        mobile,
        message,
        contactMethod,
        selectedDates
      ),
    };

    /** Send email */
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error(`${ERROR_MSG_FOR_MAIL} : ${error}`);
      } else {
        return `Thank you for choosing us! We will get back on Gmail ${email} shortly\n ${info.response}`;
      }
    });
  } catch (error) {
    logger.error(`${ERROR_MSG_FOR_MAIL} : ${error.message}`);
    throw new Error(`${ERROR_MSG_FOR_MAIL} : ${error.message}`);
  }
};

/**
 * Sends a message to a WhatsApp chat using the Twilio API
 * @param {string} name - The name of the person submitting the form
 * @param {string} email - The email of the person submitting the form
 * @param {string} mobile - The mobile phone number of the person submitting the form
 * @param {string} message - The message from the person submitting the form
 * @param {string} contactMethod - The preferred contact method of the person submitting the form
 * @param {string[]} selectedDates - The preferred dates of the person submitting the form
 * @returns {Promise<void>}
 * @throws {Error} - If the message fails to send
 */
const sendMessageToWhatsapp = (
  name,
  email,
  mobile,
  message,
  contactMethod,
  selectedDates
) => {
  try {
  } catch (error) {
    logger.error(`${ERROR_MSG_FOR_WHATSAPP} : ${error.message}`);
    throw new Error(`${ERROR_MSG_FOR_WHATSAPP} : ${error.message}`);
  }
};
module.exports = {
  sendMessageToTelegram,
  sendMessageToMail,
  sendMessageToWhatsapp,
};
