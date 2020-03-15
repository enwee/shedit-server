require("dotenv").config();
const express = require("express");
const app = express();
const draftsRouter = require("./routes/drafts.route");
const publishsRouter = require("./routes/publishs.route");
const { corsOptions } = require("./utils/constants");
const cors = require("cors");

app.use(cors(corsOptions));
app.use(express.json());

app.use("/drafts", draftsRouter);
app.use("/publishs", publishsRouter);

app.get("/", (req, res) => {
  res.json("GET / is working");
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  console.log(err);
  if (err.statusCode) {
    res.send({ error: err.message });
  } else {
    res.send({ error: "Internal server error." });
  }
});

module.exports = app;
