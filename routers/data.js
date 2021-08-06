const router = require("express").Router();
const AmpData = require("../models/AmpData");
const Device = require("../models/Device");
var mongoose = require("mongoose");

router.post("/createAmpData", function (req, res) {
  const amp1 = req.body.amp1;
  const amp2 = req.body.amp2;
  const amp3 = req.body.amp3;
  const deviceId = req.body.deviceId;
  Device.find().then((devices) => {
    for (let i = 0; i < devices.length; i++) {
      if (devices[i]._id == deviceId) {
        AmpData.create({
          amp1: amp1,
          amp2: amp2,
          amp3: amp3,
          deviceId: mongoose.Types.ObjectId(deviceId),
        });
      }
    }
  });
  res.json({
    status: true,
  });
});
router.get("/datas", function (req, res) {
  const date1 = req.query.startDate;
  const date2 = req.query.finishDate;
  const time1 = req.query.startTime;
  const time2 = req.query.finishTime;
  // const minute1 = req.body.minute1;
  // const year2 = req.body.year2;
  // const mount2 = req.body.mount2;
  // const day2 = req.body.day2;
  // const hour2 = req.body.hour2;
  // const minute2 = req.body.minute2;
  const deviceId = req.query.deviceId;

  const arrDate1 = date1.split("-");

  const arrDate2 = date2.split("-");
  const year1 = arrDate1[0];
  const mount1 = arrDate1[1];
  const day1 = arrDate1[2];
  const year2 = arrDate2[0];
  const mount2 = arrDate2[1];
  const day2 = arrDate2[2];
  const arrTime1 = time1.split(":");
  const arrTime2 = time2.split(":");
  const hour1 = arrTime1[0];
  const hour2 = arrTime2[0];
  const minute1 = arrTime1[1];
  const minute2 = arrTime2[1];
  const a1 = new Date(
    year1 +
      "-" +
      mount1 +
      "-" +
      day1 +
      "T" +
      hour1 +
      ":" +
      minute1 +
      ":" +
      "00.000Z"
  );
  const a2 = new Date(
    year2 +
      "-" +
      mount2 +
      "-" +
      day2 +
      "T" +
      hour2 +
      ":" +
      minute2 +
      ":" +
      "00.000Z"
  );
  AmpData.find({
    deviceId: mongoose.Types.ObjectId(deviceId),
    createdAt: {
      $gt: new Date(
        year1 +
          "-" +
          mount1 +
          "-" +
          day1 +
          "T" +
          hour1 +
          ":" +
          minute1 +
          ":" +
          "00.000Z"
      ),
      $lt: new Date(
        year2 +
          "-" +
          mount2 +
          "-" +
          day2 +
          "T" +
          hour2 +
          ":" +
          minute2 +
          ":" +
          "00.000Z"
      ),
    },
  })
    .sort({ createdAt: 1 })
    .then((result) => {
      var newTempData1 = [];

      for (let i = 0; i < result.length; i++) {
        lowData = {
          name: result[i].createdAt.toLocaleString("tr-TR", {
            timeZone: "UTC",
          }),
          fazA: parseFloat(result[i].amp1),
          fazB: parseFloat(result[i].amp2),
          fazC: parseFloat(result[i].amp3),
        };
        // lowData.push(parseFloat(result[i].amp1))
        // lowData.push(parseFloat(result[i].amp2))
        // lowData.push(parseFloat(result[i].amp3))
        // lowData.push(result[i].createdAt);

        newTempData1[i] = lowData;
      }
      res.send(newTempData1);
      // for (let i = 0; i < result.length; i++) {
      //   io.sockets.emit(deviceId + "chrt2", {
      //     amp1: parseFloat(result[i].amp1),
      //     amp2: parseFloat(result[i].amp2),
      //     amp3: parseFloat(result[i].amp3),
      //     dates: result[i].createdAt.toString(),
      //   });
      // }
    });
});
router.get("/interval", function (req, res) {
  const deviceId = req.query.deviceId;
  const interval = req.query.interval;
  if (interval == "hour") {
    var date1 = new Date();
    var date2 = new Date();
    date2.setHours(date2.getHours() - 1);
    AmpData.find({
      deviceId: mongoose.Types.ObjectId(deviceId),
      createdAt: {
        $gt: date2,
        $lt: date1,
      },
    })
      .sort({ createdAt: 1 })
      .then((result) => {
        var newTempData1 = [];

        for (let i = 0; i < result.length; i++) {
          lowData = {
            name: result[i].createdAt.toLocaleString("tr-TR", {
              timeZone: "UTC",
            }),
            fazA: parseFloat(result[i].amp1),
            fazB: parseFloat(result[i].amp2),
            fazC: parseFloat(result[i].amp3),
          };

          newTempData1.push(lowData);
        }
        res.send(newTempData1);
      });
  }
  if (interval == "day") {
    var date1 = new Date();
    var date2 = new Date();
    date2.setDate(date2.getDate() - 1);
    AmpData.find({
      deviceId: mongoose.Types.ObjectId(deviceId),
      createdAt: {
        $gt: date2,
        $lt: date1,
      },
    })
      .sort({ createdAt: 1 })
      .then((result) => {
        var newTempData1 = [];

        for (let i = 0; i < result.length; i = i + 120) {
          lowData = {
            name: result[i].createdAt.toLocaleString("tr-TR", {
              timeZone: "UTC",
            }),
            fazA: parseFloat(result[i].amp1),
            fazB: parseFloat(result[i].amp2),
            fazC: parseFloat(result[i].amp3),
          };

          newTempData1.push(lowData);
        }
        res.send(newTempData1);
      });
  }
  if (interval == "week") {
    var date1 = new Date();
    var date2 = new Date();
    date2.setDate(date2.getDate() - 7);

    AmpData.find({
      deviceId: mongoose.Types.ObjectId(deviceId),
      createdAt: {
        $gt: date2,
        $lt: date1,
      },
    })
      .sort({ createdAt: 1 })
      .then((result) => {
        var newTempData1 = [];

        for (let i = 0; i < result.length; i = i + 1200) {
          lowData = {
            name: result[i].createdAt.toLocaleString("tr-TR", {
              timeZone: "UTC",
            }),
            fazA: parseFloat(result[i].amp1),
            fazB: parseFloat(result[i].amp2),
            fazC: parseFloat(result[i].amp3),
          };

          newTempData1.push(lowData);
        }
        res.send(newTempData1);
      });
  }
  if (interval == "month") {
    var date1 = new Date();
    var date2 = new Date();
    date2.setDate(date2.getDate() - 30);

    AmpData.find({
      deviceId: mongoose.Types.ObjectId(deviceId),
      createdAt: {
        $gt: date2,
        $lt: date1,
      },
    })
      .sort({ createdAt: 1 })
      .then((result) => {
        var newTempData1 = [];

        for (let i = 0; i < result.length; i = i + 6000) {
          lowData = {
            name: result[i].createdAt.toLocaleString("tr-TR", {
              timeZone: "UTC",
            }),
            fazA: parseFloat(result[i].amp1),
            fazB: parseFloat(result[i].amp2),
            fazC: parseFloat(result[i].amp3),
          };

          newTempData1.push(lowData);
        }

        res.send(newTempData1);
      });
  }
});
router.get("/data", function (req, res) {
  const deviceId = "9C9C1FCA6D0C";

  AmpData.find({
    deviceId: mongoose.Types.ObjectId(deviceId),
  })
    .sort({ createdAt: -1 })
    .limit(1)
    .then((result) => {});
});

module.exports = router;
