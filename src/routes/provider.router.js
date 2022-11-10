import express, { json } from "express";
import { Provider } from "../models/provider.model.js";

export const providerRouter = express.Router();

// get all
providerRouter.get("/providers",  async (req, res) => {
  const provs = await Provider.find();
  res.json(provs);
});

// get one
providerRouter.get("/provider/:id", async (req, res) => {
  const prov = await Provider.findById({ _id: req.params.id });
  res.json(prov);
});

// post
providerRouter.post("/provider", providerValidate, async (req, res) => {
  const { code, name, address, location, email, phone_number } = req.body;
  const matchProv = await Provider.findOne({ name: name });
  if (matchProv) {
    res.status(409).send("The provider is already registered");
    return;
  }
  const newProv = new Provider({
    code,
    name,
    address,
    location,
    email,
    phone_number,
  });
  await newProv.save();
  res.status(200).send("provider registered succesfully");
});

// put
providerRouter.put("/provider/:id", async (req, res) => {
  const { _id, code, name, address, location, email, phone_number } = req.body;
  await Provider.updateOne(
    { _id: _id },
    { $set: { code, name, address, location, email, phone_number } }
  );
  res.status(200).send("provider updated successfully");
});

// delete
providerRouter.delete("/provider/:id", async (req, res) => {
  await Provider.deleteOne({ _id: req.params.id });
  res.status(200).send("provider was deleted successfully");
});
