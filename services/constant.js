const CONTACT_METHOS = {
  WHATSAPP: "Whatsapp",
  EMAIL: "Mail",
  TELEGRAM: "Telegram",
};

const ERROR_MSG_FOR_SEND_MESSAGE =
  "Failed while sending message. Please try again later.";
const ERROR_MSG_FOR_TELEGRAM =
  "Failed while sending message to Telegram. Please try again later.";
const ERROR_MSG_FOR_MAIL =
  "Failed while sending message to Mail. Please try again later.";
const ERROR_MSG_FOR_WHATSAPP =
  "Failed while sending message to Whatsapp. Please try again later.";

const ERROR_MSG_FOR_INVALID_CONTACT_METHODS =
  "Invalid contact method detected.";

module.exports = {
  CONTACT_METHOS,
  ERROR_MSG_FOR_MAIL,
  ERROR_MSG_FOR_TELEGRAM,
  ERROR_MSG_FOR_WHATSAPP,
  ERROR_MSG_FOR_SEND_MESSAGE,
  ERROR_MSG_FOR_INVALID_CONTACT_METHODS,
};
