var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({
    email,
  });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Parola hatali");
    }
  } else {
    throw Error("Kullanıcı yok");
  }
};

userSchema.statics.register = async function (username, email, password) {
  const user = await this.findOne({
    email,
  });
  if (!user) {
    const hashPass = await bcrypt.hash(password, 10);
    this.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } else {
    throw Error("Kullanıcı var");
  }
};

module.exports = mongoose.model("user", userSchema);
