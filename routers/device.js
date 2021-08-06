const router = require("express").Router();
const Device = require("../models/Device");
var mongoose = require("mongoose");
var mongodb = require("mongodb");

router.delete("/delete/:id", async (req, res) => {
  const id = req.params["id"];
  Device.deleteOne({ _id: id })
    .then((result) => res.status(200).send(null))
    .catch((err) => res.status(409).send(null));
});
router.get("/devices", async function (req, res) {
  const userId = req.query.userId;
  await Device.find({
    userId: mongodb.ObjectId(userId),
  })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send({
        device: result,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/createDevice", function (req, res) {
  const id1 = req.body.id1;
  const id2 = req.body.id2;
  const id3 = req.body.id3;
  const id4 = req.body.id4;
  const id5 = req.body.id5;
  const id6 = req.body.id6;
  const userId = req.body.userId;
  const name = req.body.name;

  const lowerid = id1 + id2 + id3 + id4 + id5 + id6;
  const id = lowerid.toUpperCase();

  Device.create({
    _id: id,
    name: name,
    userId: mongoose.Types.ObjectId(userId),
  });
  res.json({
    status: true,
  });
});
module.exports = router;

