import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper.js";

export const providerValidate = [
  check("code").exists().notEmpty().isString().withMessage("Wrong code"),
  check("name").exists().notEmpty().isString().withMessage("Wrong name"),
  check("location")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Wrong location"),
  check("email")
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage("Wrong email address"),
  check("phone_number")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Wrong phone number"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
