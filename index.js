const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRouter = require("./Routes");
const { logger } = require("./services/logger");
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Health Check For API */
app.get("/", (req, res) => {
  res.status(200).json({
    flag: "success",
    data: { status: "UP" },
  });
});

/** Routes */
app.use("/contacts", contactRouter);

/** Start Server */
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
  console.log(`Server is running on port ${port}`);
});
