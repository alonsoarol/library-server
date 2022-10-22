import mongoose from "mongoose";

const { Schema } = mongoose;
const BooksSchema = new Schema({
  code: { type: String, requiered: true },
  title: { type: String, requiered: true },
  author: { type: String, requiered: true },
  category: { type: String, requiered: true },
  provider: { type: String, required: true },
  base_price: { type: Number, requiered: true },
  public_price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export const Book = mongoose.model("Book", BooksSchema, "books");
