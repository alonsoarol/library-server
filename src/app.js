import * as dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { dbConnect } from "./database/db.js";
import { bookRouter } from "./routes/book.router.js";
import { providerRouter } from "./routes/provider.router.js";
import { saleRouter } from "./routes/sale.router.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/", bookRouter);
app.use("/", providerRouter);
app.use("/", saleRouter);

app.get("/state", (req, res) => {
  res.send("API en linea");
});

app.listen(PORT, () => {
  try {
    dbConnect();
  } catch (error) {
    console.error("there was an error on the data base", error);
  }
  console.log(`API en Puerto ${PORT}`);
});
