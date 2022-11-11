import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper.js";

export const bookValidate = [
  check("code")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Enter correct code"),
  check("title")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect title"),
  check("author")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Enter de correct author"),
  check("category")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect category"),
  check("provider")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Wrong email provider"),
  check("base_price")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("Insert the correct base_price"),
  check("public_price")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("Insert the correct public_price"),
  check("stock")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("Insert the correct stock"),
  
 

  (req, res, next) => {
        validateResult(req, res, next);
  },
];