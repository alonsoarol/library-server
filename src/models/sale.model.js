import mongoose from "mongoose";

const { Schema } = mongoose;
const SaleSchema = new Schema({
  employee: { type: String, requiered: true },
  amount_items: { type: Number, requiered: true },
  sold_items: { type: Array, requiered: true },
  total: { type: Number, requiered: true },
  date: { type: Date, default: Date.now },
});

export const Sale = mongoose.model("Sale", SaleSchema, "sale");
