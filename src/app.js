import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("API online");
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
