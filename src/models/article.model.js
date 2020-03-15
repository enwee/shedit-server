const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    ckString: String
  },
  { _id: false }
);

const topicSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    blockArray: [blockSchema]
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true, trim: true },
    topicArray: [topicSchema]
  },
  { timestamps: true }
);

const Draft = mongoose.model("Draft", articleSchema);
const Publish = mongoose.model("Publish", articleSchema);

module.exports = { Draft, Publish };
