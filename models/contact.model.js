const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const contactSchema = new Scheam(
  {
    id: { type: Number },
    email: { type: String, required: true },
    contactImage: { type: String, default: "profile.png" },
    description: { type: String },
    actionTaken: { type:Boolean ,default:false}
  },
  {
    timestamps: true,
  }
);

contactSchema.plugin(AutoIncrement, { inc_field: "id", id: "contactId" });
module.exports = mongoose.model("contact", contactSchema);