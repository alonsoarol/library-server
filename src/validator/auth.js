import { check } from "express-validator";
import { validateResult } from "../helper/validateHelper.js";

export const providerValidate = [
  
  check("name")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect name"),
  check("surname")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect name"),
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
  check("picturer")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("Incorrect picture"),
  check("date")
    .isISO8601()
    .isDate()
    .withMessage("La fecha  debe ser en formato (yyyy-mm-dd)"),
  
  
  (req, res, next) => {
        validateResult(req, res, next);
  },
];