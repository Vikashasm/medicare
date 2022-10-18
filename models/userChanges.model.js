const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const userChangesSchema = new Scheam(
  {
    id: { type: Number },
    username: { type: String,default:null},
    userId: {type:Scheam.Types.ObjectId,ref:'user'},
    profileId: { type:String },
    email: { type: String,default:null },
    phone: { type: Number,default:null },
    read: { type: Boolean ,default:false },
  },
  {
    timestamps: true,
  }
);

userChangesSchema.plugin(AutoIncrement, { inc_field: "id", id: "userChangeId" });
module.exports = mongoose.model("userChange", userChangesSchema);