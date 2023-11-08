const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./configs/db");
const userRouter = require("./routes/user.router");
const insightsRouter = require("./routes/insights.router");
const { attachUserEmail } = require("./middlewares/attachUserEmail.middleware");
const PORT = process.env.PORT;

app.use(express.json());
app.use(require("cors")());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is live" });
});

app.use("/", attachUserEmail, userRouter);
app.use("/", insightsRouter);

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
