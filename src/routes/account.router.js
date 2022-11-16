import { Account } from "../models/account.model.js";
import express from "express";

export const accountRouter = express.Router();

accountRouter.get("/accounts", async (req, res) => {
    const accounts = await Account.find();
    res.json(accounts);
  });
  
  accountRouter.put("/account/permissions/:id", async (req, res) => {
    console.log(req.body);
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
  
  accountRouter.delete("/account/:id", async (req, res) => {
    await Account.deleteOne({ _id: req.params.id });
    res.status(200).send("account was deleted successfully");
  });