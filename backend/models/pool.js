import mongoose from "mongoose";
const { Schema } = mongoose;

const poolSchema = new Schema({
  name: String,
  phLevel: Number,
  clLevel: Number,
  cleaningMethod: String,
  chemicalsPoured: String,
  chemicalsQuantity: Number,
  pictures: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  employee: { type: Schema.Types.ObjectId, ref: "Employee" },
});

const Pool = mongoose.model("Pool", poolSchema);

export default Pool;
