import express, { json } from "express";
import { Sale } from "../models/sale.model.js";
import { saleValidate } from "../validator/sale.js";
import { Book } from "../models/book.model.js";
import { Account } from "../models/account.model.js";

export const saleRouter = express.Router();

// obtener todas las ventas
saleRouter.get("/sales", async (req, res) => {
  const sales = await Sale.find();
  await Account.populate(sales, { path: "employee" }, () => {
    res.json(sales);
  });
});

// obtener una sola venta(id venta)
saleRouter.get("/sale/:id", async (req, res) => {
  const sale = await Sale.findById({ _id: req.params.id });
  res.json(sale);
});

//obtener todas las ventas de un empleado(id empleado)
saleRouter.get("/sale/byemployee/:id", async (req, res) => {
  const sale = await Sale.find({ employee: req.params.id });
  await Book.populate(sale, { path: "sold_items" }, () => res.json(sale));
});

// creamos una nueva venta
saleRouter.post("/sale", async (req, res) => {
  const { employee, amount_items, sold_items, total, date } = req.body;
  const newSale = new Sale({
    employee,
    amount_items,
    sold_items,
    total,
    date,
  });
  sold_items.forEach(async (element) => {
    //recorremos cada item de la venta y le modificamos sold y stock
    await Book.updateOne({ _id: element }, { $inc: { sold: 1, stock: -1 } });
  });

  await newSale.save();
  res.status(200).send("sale registered succesfully");
});

// modificamos una venta(id venta)
saleRouter.put("/sale/:id", async (req, res) => {
  const { _id, employee, amount_items, sold_items, total } = req.body;
  await Sale.updateOne(
    { _id: _id },
    { $set: { employee, amount_items, sold_items, total } }
  );
  res.status(200).send("sale updated successfully");
});

// borramos una venta
saleRouter.delete("/sale/:id", async (req, res) => {
  await Sale.deleteOne({ _id: req.params.id });
  res.status(200).send("sale was deleted successfully");
});
