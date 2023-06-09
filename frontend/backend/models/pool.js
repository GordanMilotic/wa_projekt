import mongoose from "mongoose";
const Schema = mongoose.Schema;

const poolSchema = new Schema({
  name: String,
  phLevel: Number,
  clLevel: Number,
  cleaningMethod: String,
  chemicalsPoured: String,
  chemicalsQuantity: Number,
  picture: { data: Buffer, contentType: String },
});

const Pool = mongoose.model("Pool", poolSchema);
export default Pool;
