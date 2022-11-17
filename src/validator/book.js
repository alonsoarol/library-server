import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper.js";

export const bookValidate = [
  check("code").exists().notEmpty().isString().withMessage("Wrong code"),
  check("title").exists().notEmpty().isString().withMessage("Wrong title"),
  check("author").exists().notEmpty().isString().withMessage("Wrong author"),
  check("category")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Wrong category"),
  check("provider")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Wrong provider"),
  check("base_price")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("Wrong base price"),
  check("public_price")
    .exists()
    .notEmpty()
    .isNumeric()
    .withMessage("Wrong public price"),
  check("stock").exists().notEmpty().isInt().withMessage("Wrong stock"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];
