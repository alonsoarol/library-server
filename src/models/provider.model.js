import mongoose from "mongoose";

const { Schema } = mongoose;
const ProviderSchema = new Schema({
  code: { type: String, requiered: true },
  name: { type: String, requiered: true },
  address: { type: String, requiered: true },
  location: { type: String, requiered: true },
  email: { type: String, required: true },
  phone_number: { type: Number, requiered: true },
});

export const Provider = mongoose.model("Provider", ProviderSchema, "provider");