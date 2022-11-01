import express, { json } from "express";
import { Book } from "../models/book.model.js";

export const bookRouter = express.Router();

// get all
bookRouter.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// get one
bookRouter.get("/book/:id", async (req, res) => {
  const book = await Book.findById({ _id: req.params.id });
  res.json(book);
});

// post
bookRouter.post("/book", async (req, res) => {
  const {
    code,
    title,
    author,
    category,
    provider,
    base_price,
    public_price,
    stock,
    sold,
  } = req.body;
  const matchBook = await Book.findOne({ title: title });
  if (matchBook) {
    res.status(409).send("The book is already exist");
    return;
  }
  const newBook = new Book({
    code,
    title,
    author,
    category,
    provider,
    base_price,
    public_price,
    stock,
    sold,
  });
  await newBook.save();
  res.status(200).send("book registered succesfully");
});

// put
bookRouter.put("/book/:id", async (req, res) => {
  const {
    _id,
    code,
    title,
    author,
    category,
    provider,
    base_price,
    public_price,
    stock,
    sold,
  } = req.body;
  await Book.updateOne(
    { _id: _id },
    {
      $set: {
        code,
        title,
        author,
        category,
        provider,
        base_price,
        public_price,
        stock,
        sold,
      },
    }
  );
  res.status(200).send("book updated successfully");
});

// delete
bookRouter.delete("/book/:id", async (req, res) => {
  await Book.deleteOne({ id: req.params.id });
  res.status(200).send("book was deleted successfully");
});
