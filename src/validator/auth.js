import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper.js";

export const providerValidate = [
  check("name").exists().notEmpty().isString().withMessage("Incorrect name"),
  check("surname")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect surname"),
  check("email")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("Wrong email address"),
  check("password")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Enter de correct password"),
  check("gender")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect gender"),
  check("date")
    .isISO8601()
    .isDate()
    .withMessage("Date must be in the format (yyyy-mm-dd)"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
