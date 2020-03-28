const mongoose = require("mongoose");
const { mongoOptions } = require("./constants");

const dbName = "shedit";
const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/" + dbName;

mongoose
  .connect(dbUrl, mongoOptions)
  .catch(error => console.log(`db initial connect>> ${error.message}`));
const db = mongoose.connection;

db.on("error", ({ name, message }) => {
  console.log(`error EVENT>> ${name}`);
  console.log(`message: ${message}`);
});

db.once("open", () => {
  console.log("connected to mongodb");
});
