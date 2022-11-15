import mongoose from "mongoose";

const { Schema } = mongoose;
const SaleSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref:"Account" },
  amount_items: { type: Number, requiered: true },
  sold_items:[{type: Schema.Types.ObjectId, ref:"Book"}],
  total: { type: Number, requiered: true },
  date: { type: String, requiered: true },
});

export const Sale = mongoose.model("Sale", SaleSchema, "sale");
