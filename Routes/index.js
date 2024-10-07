const express = require("express");
const { contactsController } = require("../controllers/contactController");

const router = express.Router();

router.post("/contact", contactsController);

module.exports = router;
