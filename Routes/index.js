const express = require("express");
const qaysController = require("../Controllers/qaysController");

const router = express.Router();

router.post("/contact", qaysController);

module.exports = router;
