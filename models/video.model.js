const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const videoSchema = new Scheam(
  {
    id: { type: Number },
    video: { type: String, default: "profile.png"},
    thumbnail: { type: String },
    title: { type: String },
    description: { type: String },
    videoType: {type:String, enum:['stressManagement','betterSleep','skinPositivity']},
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(AutoIncrement, { inc_field: "id", id: "videoId" });
module.exports = mongoose.model("video", videoSchema);