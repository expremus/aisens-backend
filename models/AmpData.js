var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ampDataSchema = new Schema(
  {
    amp1: {
      type: Number,
    },
    amp2: {
      type: Number,
    },
    amp3: {
      type: Number,
    },
    state: {
      type: String,
    },
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("ampData", ampDataSchema);
