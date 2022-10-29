const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Scheam = mongoose.Schema;

const productSchema = new Scheam(
  {
    id: { type: Number },
    productName: { type: String, required: true },
    companyName: { type: String, required: true },
    productForm: { type:String, enum:['Capsule','Tablet','Powder','Moisturizer','Treatment','Oil','shampoo','Conditioner','Soap','facewash','Cleanser'] },
    productImage: { type: String, default: "profile.png" },  
    userId: {type:Scheam.Types.ObjectId,ref:'user'},
    isPublic: { type: Boolean },
    productType:{ type:String, enum:['Tropical','Oral','Others'] },
    read: { type: Boolean ,default:false},
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(AutoIncrement, { inc_field: "id", id: "productId" });
module.exports = mongoose.model("product", productSchema);

