const express = require("express");
const app = express();
const cors = require("cors");
const { corsOptions, maxBodyPayload } = require("./utils/constants");
const draftsRouter = require("./routes/drafts.route");
const publishsRouter = require("./routes/publishs.route");

app.use(cors(corsOptions));
app.use(express.json({ limit: maxBodyPayload }));

app.use("/drafts", draftsRouter);
app.use("/publishs", publishsRouter);

app.get("/", (req, res) => {
  res.json("GET / is working");
});

app.all("/*", (req, res, next) => {
  const err = new Error();
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.log(err);
  if (err.name === "ValidationError") err.statusCode = 400;
  if (err.name === "TypeError") err.statusCode = 404;
  const status = err.statusCode || 500;
  if (status === 404) err.message = `${req.method} ${req.url} not found`;
  res.status(status).json(err.message);
});

module.exports = app;
