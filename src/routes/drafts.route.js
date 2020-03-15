const express = require("express");
const router = express.Router();
const { Draft } = require("../models/article.model");
const wrapAsync = require("../utils/wrapAsync");
const { titleUuidOnly, topicArrayOnly } = require("../utils/constants");
//const { v4: uuidv4 } = require("uuid");

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const draftCollection = await Draft.find({}, titleUuidOnly);
    res.status(200).send(draftCollection);
  })
);

router
  .route("/:id")
  .get(
    wrapAsync(async (req, res, next) => {
      const regex = new RegExp(`^${req.params.id}$`, "i");
      const draft = await Draft.findOne({ uuid: regex }, topicArrayOnly);
      res.status(200).send(draft);
    })
  )
  .put(
    wrapAsync(async (req, res, next) => {
      const regex = new RegExp(`^${req.params.id}$`, "i");
      const status = (await Draft.exists({ uuid: regex })) ? 204 : 201;
      await Draft.findOneAndUpdate({ uuid: regex }, req.body, {
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      });
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

// router.post(
//   "/",
//   wrapAsync(async (req, res, next) => {
//     const newArticle = new Draft(req.body);
//     await Draft.init();
//     newArticle.id = uuidv4();
//     await newArticle.save();
//     res.status(201).send(newArticle);
//   })
// );
