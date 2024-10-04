const express = require("express");
const cors = require("cors");
const qaysRouter = require("./Routes");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

/** Health Check For API */
app.get("/", (req, res) => {
  res.status(200).json({
    flag: "success",
    data: { status: "UP" },
  });
});

/** Routes */
app.use("/qays", qaysRouter);

/** Start Server */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
