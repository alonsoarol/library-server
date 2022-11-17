import * as dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Account } from "../models/account.model.js";

//configuracion del jwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "unsecreto",
};
//configuramos nueva estrategia
passport.use(
  new Strategy(jwtOptions, async (payload, next) => {
    const account = await Account.findOne({ email: payload.account.email });
    if (account) {
      next(null, account);
    } else {
      next(null, false);
    }
  })
);

//login
