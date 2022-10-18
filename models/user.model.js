const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const userSchema = new Scheam(
  {
    id: { type: Number },
    google: {
      email: { type: String, lowercase: true },
      id: { type: String },
    },
    isAdmin: { type: Boolean, default: false },
    username: { type: String, unique:true},
    dateOfBirth: { type: String, required: true },
    skinCondition:  {type:String,
      enum:['eczema','psoriasis','acne','rosacea','ichthyosis','vitiligo']},
    gender: { enum:['male','female','transgender'] },
    country: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, default: "profile.png" },
    phone: { type: Number },
    verificationToken: { type: String },
    Duration: { type: String },
    profileId:{ type:String ,unique:true},
    isDeleted: { type:Boolean ,default:false}
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(AutoIncrement, { inc_field: "id", id: "userId" });
module.exports = mongoose.model("user", userSchema);