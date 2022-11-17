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
    .isNumeric()
    .withMessage("Wrong amount items"),
  check("sold_items")
    .exists()
    .notEmpty()
    .isArray()
    .withMessage("Wrong sold items"),
  check("total").exists().notEmpty().isNumeric().withMessage("Wrong total"),
  check("date")
    .exists()
    .notEmpty()
    .isString()
    .isISO8601()
    .withMessage("the Date format should be ISO8601 (yyyy-mm-dd)"),

  ,
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
