const express = require("express");
const router = express.Router();
const { wrapAsync } = require("../utils/functions");
const { Draft } = require("../models/article.model");
const { titleUuidOnly, topicArrayOnly } = require("../utils/constants");

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const draftCollection = await Draft.find({}, titleUuidOnly, {
      sort: { title: 1 }
    });
    res.send(draftCollection);
  })
);

router
  .route("/:id")
  .get(
    wrapAsync(async (req, res, next) => {
      const regex = new RegExp(`^${req.params.id}$`, "i");
      const draft = await Draft.findOne({ uuid: regex }, topicArrayOnly);
      res.send(draft);
    })
  )
  .put(
    wrapAsync(async (req, res, next) => {
      const regex = new RegExp(`^${req.params.id}$`, "i");
      const status = (await Draft.exists({ uuid: regex })) ? 204 : 201;
      await Draft.findOneAndUpdate({ uuid: regex }, req.body, {
        upsert: true,
        runValidators: true
      });
      res.sendStatus(status);
    })
  )
  .delete(
    wrapAsync(async (req, res, next) => {
      const regex = new RegExp(`^${req.params.id}$`, "i");
      const status = (await Draft.exists({ uuid: regex })) ? 204 : 404;
      await Draft.findOneAndDelete({ uuid: regex });
      res.sendStatus(status);
    })
  );

// router.use((err, req, res, next) => {
//   if (err.name === "ValidationError") {
//     err.statusCode = 400;
//   }
//   if (err.name === "MongoError") {
//     err.statusCode = 422;
//     err.message = "Duplicate Title Error.";
//   }
//   next(err);
// });

module.exports = router;
