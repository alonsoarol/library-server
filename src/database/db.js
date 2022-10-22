import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("API connected to atlas"))
    .catch((error) => console.log(error));
};
