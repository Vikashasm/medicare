const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Scheam = mongoose.Schema;

const scheduleSchema = new Scheam(
  {
    id: { type: Number },
    productId: {type:Scheam.Types.ObjectId,ref:'product'},
    userId: {type:Scheam.Types.ObjectId,ref:'user'},
    schedule: { type: String,enum:['morning','night','both','everyday','selectedDays'] },
  },
  {
    timestamps: true,
  }
);

scheduleSchema.plugin(AutoIncrement, { inc_field: "id", id: "scheduleId" });
module.exports = mongoose.model("schedule", scheduleSchema);