const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

userSchema = new mongoose.Schema(
  {
    email: String,

    password: String,
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = new mongoose.model("User", userSchema);
