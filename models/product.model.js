const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const productSchema = new Scheam(
  {
    id: { type: Number },
    productName: { type: String, required: true },
    companyName: { type: String, required: true },
    productForm: { type:String, enum:['capsule','tablet','powder'] },
    productImage: { type: String, default: "profile.png" },  
    userId: {type:Scheam.Types.ObjectId,ref:'user'},
    isPublic: { type: Boolean },
    read: { type: Boolean ,default:false},
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(AutoIncrement, { inc_field: "id", id: "productId" });
module.exports = mongoose.model("product", productSchema);
