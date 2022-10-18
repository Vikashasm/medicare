const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const routineLogSchema = new Schema(
  {
    id: { type: Number },
    userId: {type:Schema.Types.ObjectId,ref:'user'},
    wellSleepLastNight: { type: Number, required: true },
    sleepingHoursLastNight: { type: Number, required: true },
    stressLevel: { type:Number,required: true  },
    ExerciseTimeToday: { type: Number, required: true  },  
    workoutIntensity: {type: Number, required: true },
    amountOfWaterToday: {type: Number, required: true },
    bowelMovementsToday: {type: Number, required: true },
    digestiveDiscomfort: {type: Number, required: true },
    itchingIntensity: {type: Number, required: true },
    psoriasisScaling: {type: Number, required: true },

  },
  {
    timestamps: true,
  }
);

routineLogSchema.plugin(AutoIncrement, { inc_field: "id", id: "routineLogId" });
module.exports = mongoose.model("routineLog", routineLogSchema);
