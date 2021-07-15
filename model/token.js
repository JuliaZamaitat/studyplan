const mongoose = require("mongoose"),
  { Schema } = mongoose,
  tokenSchema = Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: { type: String, required: true },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200, //12 Stunden
    },
  });

module.exports = mongoose.model("Token", tokenSchema);
