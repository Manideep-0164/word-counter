const mongoose = require("mongoose");

const insightSchema = mongoose.Schema(
  {
    domainName: { type: String, required: true },
    wordCount: { type: Number, required: true },
    isFavorite: { type: Boolean, required: true, default: false },
    webLinks: { type: [String], required: true, default: [] },
    mediaLinks: { type: [String], required: true, default: [] },
    user: { type: String, required: true },
  },
  { versionKey: false }
);

const InsightModel = mongoose.model("insight", insightSchema);

module.exports = InsightModel;
