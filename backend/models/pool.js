import mongoose from "mongoose";
const Schema = mongoose.Schema;

const poolSchema = new Schema({
  name: String,
  phLevel: Number,
  clLevel: Number,
  tabletCount: Number,
  cleaningMethods: [String],
  chemicalsPoured: String,
  chemicalsQuantity: Number,
  startPictures: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  endPictures: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  username: String,
});

const Pool = mongoose.model("Pool", poolSchema);

export default Pool;
