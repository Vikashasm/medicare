const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Scheam = mongoose.Schema;

const scheduleSchema = new Scheam(
  {
    id: { type: Number },
    productId: {type:Scheam.Types.ObjectId,ref:'product'},
    userId: {type:Scheam.Types.ObjectId,ref:'user'},
    type: {type:String, enum:['Tropical','Oral','Others']},
    schedule: { type: String,enum:['morning','night','evening','both','thrice'] },
    SelectedDays : [
      {
      day:{type:String},
      selected: {type:Boolean,default:true},
      medicineTaken: [
        {
          time:{type:String},
          active:{type:Boolean,default:false}
        }
      ]
      }
    ]
  },
  {
    timestamps: true,
  }
);

scheduleSchema.plugin(AutoIncrement, { inc_field: "id", id: "scheduleId" });
module.exports = mongoose.model("schedule", scheduleSchema);