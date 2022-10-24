import express, { json } from "express";
import { Sale } from "../models/sale.model.js";

export const saleRouter = express.Router();

// get all
saleRouter.get("/sales", async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

// get one
saleRouter.get("/sale/:id", async (req, res) => {
  const sale = await Sale.findById({ _id: req.params.id });
  res.json(sale);
});

// post
saleRouter.post("/sale", async (req, res) => {
  const { employee, amount_items, sold_items, total } = req.body;
  const newSale = new Sale({
    employee,
    amount_items,
    sold_items,
    total,
  });
  await newSale.save();
  res.status(200).send("sale registered succesfully");
});
// momgoose populate 

// put
saleRouter.put("/sale/:id", async (req, res) => {
  const { _id, employee, amount_items, sold_items, total } = req.body;
  await Sale.updateOne(
    { _id: _id },
    { $set: { employee, amount_items, sold_items, total } }
  );
  res.status(200).send("sale updated successfully");
});

// delete
saleRouter.delete("/sale/:id", async (req, res) => {
  await Sale.deleteOne({ _id: req.params.id });
  res.status(200).send("sale was deleted successfully");
});
