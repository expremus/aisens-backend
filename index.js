var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var http = require("http").Server(app);
const AmpData = require("./models/AmpData");
var mongoose = require("mongoose");
require("dotenv").config();

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("./db/index")();

const deviceRouter = require("./routers/device");
const usersRouter = require("./routers/auth");
const dataRouter = require("./routers/data");

app.use(cors());
const io = require("socket.io")(http, {
  cors: {
    origin: "https://ai-sens.com",
    methods: ["GET", "POST"],
  },
});
app.options("*", cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", dataRouter);
app.use("/device", deviceRouter);
app.use("/user", usersRouter);

// app.use(function (req, res, next) {
//   next(createError(404));
// });

var validator = require("express-validator");
var logger = require("morgan");

io.on("connection", (socket) => {
  let i = 0;
  socket.on("amp_data", (id) => {
    setInterval(() => {
      const deviceId = id;

      AmpData.find({
        deviceId: mongoose.Types.ObjectId(deviceId),
      })
        .limit(1)
        .sort({ createdAt: -1 })
        .then((result) => {
          var newAmpData1 = parseFloat(result[0].amp1);
          var newAmpData2 = parseFloat(result[0].amp2);
          var newAmpData3 = parseFloat(result[0].amp3);
          var newState = result[0].state;
          io.sockets.emit(deviceId, {
            amp1: newAmpData1,
            amp2: newAmpData2,
            amp3: newAmpData3,
          });
        });
      i++;
    }, 1000);
  });
  // socket.on("amp_data_date", (date1, date2, time1, time2, deviceId) => {
  //   const newDate = new Date(date1);
  //   console.log(newDate);

  //   const arrDate1 = date1.split("-");
  //   const arrDate2 = date2.split("-");
  //   const year1 = arrDate1[0];
  //   const mount1 = arrDate1[1];
  //   const day1 = arrDate1[2];
  //   const year2 = arrDate2[0];
  //   const mount2 = arrDate2[1];
  //   const day2 = arrDate2[2];
  //   const arrTime1 = time1.split(":");
  //   const arrTime2 = time2.split(":");
  //   const hour1 = arrTime1[0];
  //   const hour2 = arrTime2[0];
  //   const minute1 = arrTime1[1];
  //   const minute2 = arrTime2[1];
  //   console.log(year1, mount1, day1, hour1, minute1);
  //   console.log(year2, mount2, day2, hour2, minute2);
  //   AmpData.find({
  //     deviceId: mongoose.Types.ObjectId(deviceId),
  //     createdAt: {
  //       $gte: new Date(
  //         year1 +
  //           "-" +
  //           mount1 +
  //           "-" +
  //           day1 +
  //           "T" +
  //           hour1 +
  //           ":" +
  //           minute1 +
  //           ":" +
  //           "00.000Z"
  //       ),
  //       $lte: new Date(
  //         year2 +
  //           "-" +
  //           mount2 +
  //           "-" +
  //           day2 +
  //           "T" +
  //           hour2 +
  //           ":" +
  //           minute2 +
  //           ":" +
  //           "00.000Z"
  //       ),
  //     },
  //   }).then((result) => {
  //     console.log(result);
  //     for (let i = 0; i < result.length; i++) {
  //       io.sockets.emit(deviceId + "chrt2", {
  //         amp1: parseFloat(result[i].amp1),
  //         amp2: parseFloat(result[i].amp2),
  //         amp3: parseFloat(result[i].amp3),
  //         dates: result[i].createdAt.toString(),
  //       });
  //     }
  //   });
  // });
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("disconnect");
  });
});

http.listen(process.env.PORT || 3001, function () {
  console.log("listening on *:3001");
});
