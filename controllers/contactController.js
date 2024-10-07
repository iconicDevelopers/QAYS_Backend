const get = require("lodash/get");
const contactsService = require("../services/contactService");

/**
 * Handles a POST request to /contacts and sends an email using a Gmail account
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @returns {Promise<void>}
 */
const contactsController = async (req, res) => {
  try {
    const data = await contactsService(get(req.body, "data", {}));
    res.status(200).json({
      flag: "success",
      message: data,
    });
  } catch (err) {
    req.logger.error(err.message);
    res.status(500).json({
      flag: "error",
      error: err.message,
    });
  }
};

module.exports = { contactsController };
