const qaysService = require("../Services/qaysService");

const qaysController = async (req, res) => {
  try {
    await qaysService(req.body);
    res.status(200).json({
      flag: "success",
      message: "Message sent successfully",
    });
  } catch (err) {
    req.logger.error(err.message);
    res.status(500).json({
      flag: "error",
      error: err.message,
    });
  }
};

module.exports = qaysController;
