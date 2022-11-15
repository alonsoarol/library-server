import express, { json } from "express";
import { Sale } from "../models/sale.model.js";
import { saleValidate } from "../validator/sale.js";
import { Book } from "../models/book.model.js";

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
saleRouter.post("/sale", saleValidate, async (req, res) => {
  const { employee, amount_items, sold_items, total } = req.body;
  const newSale = new Sale({
    employee,
    amount_items,
    sold_items,
    total,
    date,
  });
  sold_items.array.forEach(async (element) => {
    await Book.updateOne({_id: element}, {$inc:{ sold: 1, stock: -1} });
  });

  await newSale.save();
  res.status(200).send("sale registered succesfully");
});

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
