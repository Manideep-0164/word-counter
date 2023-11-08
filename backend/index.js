const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./configs/db");
const PORT = process.env.PORT;

app.use(express.json());
app.use(require("cors")());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is live" });
});

connection
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  })
  .catch((error) => {
    console.log("Error connected server or Database =>", error);
  });
