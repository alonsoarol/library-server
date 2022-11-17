import { Account } from "../models/account.model.js";
import express from "express";

export const accountRouter = express.Router();
//obtenemos todas las cuentas
accountRouter.get("/accounts", async (req, res) => {
  const accounts = await Account.find();
  res.json(accounts);
});
// obtenemos una cuenta
accountRouter.get("/account/:id", async (req, res) => {
  const account = await Account.findById({ _id: req.params.id });
  res.json(account);
});
//modificamos permisos de una cuenta
accountRouter.put("/account/permissions/:id", async (req, res) => {
  const { permissions } = req.body;
  await Account.updateOne(
    { _id: req.params.id },
    {
      $set: {
        permissions: permissions,
      },
    }
  );
  res.status(200).send("account updated successfully");
});
//borramos una cuenta
accountRouter.delete("/account/:id", async (req, res) => {
  await Account.deleteOne({ _id: req.params.id });
  res.status(200).send("account was deleted successfully");
});
