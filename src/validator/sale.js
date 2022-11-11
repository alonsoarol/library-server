import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper.js";

export const saleValidate = [
  
  check("employee")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect employee"),
  check("amount_items")
    .exists()
    .notEmpty()
    .isInt()
    .withMessage("Insert the correct amount_items"),
  check("sold_items")
    .exists()
    .notEmpty()
    .isInt()
    .withMessage("Insert the correct sold_items"),
  check("total")
    .exists()
    .notEmpty()
    .isInt()
    .withMessage("Insert the correct total"),
  

  (req, res, next) => {
        validateResult(req, res, next);
  },
];