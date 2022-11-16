import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcryptjs";
import { Account } from "../models/account.model.js";
import { randomPic } from "../helper/randomPic.js";
import jwt from "jsonwebtoken";
import passport from "passport";

export const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { password, email, name, surname, gender } = req.body;

  const passwordHashed = await bcrypt.hash(password, 8);

  const userExist = await Account.findOne({ email: email });
  if (userExist) {
    res.status(409).send("Email is already exist");
    return;
  }
  const newAccount = new Account({
    email: email,
    password: passwordHashed,
    name: name,
    surname: surname,
    gender: gender,
    picture: randomPic(gender),
  });

  await newAccount.save();
  res.send("Account created successfully");
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ email: email });
  if (!account) {
    res.send("Invalid username or password (account does not exist))");
    return;
  }
  const passwordCompared = await bcrypt.compare(password, account.password);
  if (!passwordCompared) {
    res.send("Invalid username or password (invalid password)");
    return;
  }

  const payload = {
    account: account,
  };
  const token = jwt.sign(payload, "unsecreto", { expiresIn: 60 });
  res.json({
    account: account,
    token: token,
  });
});




