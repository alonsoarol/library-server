import express, { json } from "express";
import { Book } from "../models/book.model.js";
import { bookValidate } from "../validator/book.js";
import { Provider } from "../models/provider.model.js";

export const bookRouter = express.Router();

// obtenemos todos los libros
bookRouter.get("/books", async (req, res) => {
  const books = await Book.find();
  await Provider.populate(books, { path: "provider" }, () => {
    res.json(books);
  });
});

// obtenemos un libro
bookRouter.get("/book/:id", async (req, res) => {
  const book = await Book.findById({ _id: req.params.id });
  res.json(book);
});
// obtenemos todos los libros filtrados por campo (asc o desc)
bookRouter.get("/books/:field/:type", async (req, res) => {
  let books;
  switch (req.params.field) {
    case "code":
      books = await Book.find().sort({
        code: req.params.type === "asc" ? 1 : -1,
      });
      break;
    case "title":
      books = await Book.find().sort({
        title: req.params.type === "asc" ? 1 : -1,
      });
      break;
    case "author":
      books = await Book.find().sort({
        author: req.params.type === "asc" ? 1 : -1,
      });
      break;
    case "category":
      books = await Book.find().sort({
        category: req.params.type === "asc" ? 1 : -1,
      });
      break;
    case "provider":
      books = await Book.find().sort({
        provider: req.params.type === "asc" ? 1 : -1,
      });
      break;
    case "base_price":
      books = await Book.find().sort({
        base_price: req.params.type === "asc" ? 1 : -1,
      });
      break;
    case "public_price":
      books = await Book.find().sort({
        public_price: req.params.type === "asc" ? 1 : -1,
      });
      break;
    case "stock":
      books = await Book.find().sort({
        stock: req.params.type === "asc" ? 1 : -1,
      });
      break;
  }

  res.json(books);
});
// creamos un libro
bookRouter.post("/book", bookValidate, async (req, res) => {
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

// modificamos un libro
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

// borramos un libro
bookRouter.delete("/book/:id", async (req, res) => {
  await Book.deleteOne({ id: req.params.id });
  res.status(200).send("book was deleted successfully");
});
