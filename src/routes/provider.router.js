import express, { json } from "express";
import { Provider } from "../models/provider.model.js";
import { providerValidate } from "../validator/provider.js";

export const providerRouter = express.Router();

// obtener todos los proveedores
providerRouter.get("/providers", async (req, res) => {
  const provs = await Provider.find();
  res.json(provs);
});

// obtener un solo proveedor
providerRouter.get("/provider/:id", async (req, res) => {
  const prov = await Provider.findById({ _id: req.params.id });
  res.json(prov);
});

// creamos un proveedor
providerRouter.post("/provider", providerValidate, async (req, res) => {
  const { code, name, location, email, phone_number } = req.body;
  // verificamos si existe
  const matchProv = await Provider.findOne({ name: name });
  if (matchProv) {
    res.status(409).send("The provider is already registered");
    return;
  }
  //creamos el nuevo proveedor para guardar
  const newProv = new Provider({
    code,
    name,
    location,
    email,
    phone_number,
  });
  await newProv.save();
  res.status(200).send("provider registered succesfully");
});

// modificamos un proveedor
providerRouter.put("/provider/:id", async (req, res) => {
  const { _id, code, name, location, email, phone_number } = req.body;
  await Provider.updateOne(
    { _id: _id },
    { $set: { code, name, location, email, phone_number } }
  );
  res.status(200).send("provider updated successfully");
});

// borramos un proveedor
providerRouter.delete("/provider/:id", async (req, res) => {
  await Provider.deleteOne({ _id: req.params.id });
  res.status(200).send("provider was deleted successfully");
});
