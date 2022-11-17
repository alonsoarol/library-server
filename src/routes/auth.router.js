import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bcrypt from "bcryptjs";
import { Account } from "../models/account.model.js";
import { randomPic } from "../helper/randomPic.js";
import jwt from "jsonwebtoken";

export const authRouter = express.Router();

//creamos una cuenta
authRouter.post("/signup", async (req, res) => {
  const { password, email, name, surname, gender } = req.body;
  //encriptamos el password antes de guardarlo
  const passwordHashed = await bcrypt.hash(password, 8);
  //verificamos si ya existe el mail
  const userExist = await Account.findOne({ email: email });
  if (userExist) {
    res.status(409).send("Email is already exist");
    return;
  }
  //creamos la nueva cuenta
  const newAccount = new Account({
    email: email,
    password: passwordHashed,
    name: name,
    surname: surname,
    gender: gender,
    picture: randomPic(gender),
  });
  //guardamos la nueva cuenta
  await newAccount.save();
  res.send("Account created successfully");
});

//iniciar sesion
authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  //verificamos si existe el email en la BD
  const account = await Account.findOne({ email: email });
  if (!account) {
    res.send("Invalid username or password (account does not exist))");
    return;
  }
  //desencriptamos password y comparamos
  const passwordCompared = await bcrypt.compare(password, account.password);
  if (!passwordCompared) {
    res.send("Invalid username or password (invalid password)");
    return;
  }
  //creamos payload
  const payload = {
    account: account,
  };
  //creamos token (payload, palabra secreta, expiracion)
  const token = jwt.sign(payload, "unsecreto", { expiresIn: 60 });
  //enviamos el token y la info del user
  res.json({
    account: account,
    token: token,
  });
});
