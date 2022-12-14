import mongoose from "mongoose";
//Modelo de cuentas
const { Schema } = mongoose;
const AccountSchema = new Schema({
  name: { type: String, requiered: true },
  surname: { type: String, requiered: true },
  email: { type: String, requiered: true },
  password: { type: String, required: true },
  gender: { type: String, requiered: true },
  picture: { type: String, requiered: false },
  permissions: {
    type: Object,
    default: { read: true, write: true, admin: false },
  },
  // date: { type: String, required: true },
});

export const Account = mongoose.model("Account", AccountSchema, "accounts");
