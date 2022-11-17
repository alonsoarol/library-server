import mongoose from "mongoose";
//Modelo de proveedores
const { Schema } = mongoose;
const ProviderSchema = new Schema({
  code: { type: String, requiered: true },
  name: { type: String, requiered: true },
  location: { type: String, requiered: true },
  email: { type: String, required: true },
  phone_number: { type: String, requiered: true },
});

export const Provider = mongoose.model("Provider", ProviderSchema, "providers");
