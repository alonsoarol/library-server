import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper.js";

export const providerValidate = [
  check("code")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Enter correct code"),
  check("name")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect name"),
  check("address")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Enter de correct address"),
  check("location")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect location"),
  check("email")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("Wrong email address"),
  check("phone_number")
    .exists()
    .notEmpty()
    .isNumer()
    .isInt()
    .withMessage("Insert the correct phone number"),
  (req, res, next) => {
        validateResult(req, res, next);
  },
];