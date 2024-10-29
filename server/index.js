import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

// DB
const books = [
  { id: 0, name: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 1, name: "1984", author: "George Orwell" },
  { id: 2, name: "Pride and Prejudice", author: "Jane Austen" },
  { id: 3, name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 4, name: "Moby-Dick", author: "Herman Melville" },
];

// Get
app.get("/", (req, res) => {
  try {
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(books);
    console.log("Retrieving books successfully", books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error retrieving books");
  }
});

// Get
app.get("/get-book/:id", (req, res) => {
  try {
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    const bookId = req.params.id;
    const response = books.find((item) => item.id == bookId);
    if (!response) {
      return res.status(400).json({ message: "Book not found" });
    }
    res.status(200).json(response);
    console.log("Retrieving book successfully", response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error retrieving book");
  }
});

// Post
app.post("/add-book", (req, res) => {
  const newBook = { id: books[books.length - 1].id + 1, ...req.body };
  if (!newBook.name || !newBook.author) {
    return res
      .status(400)
      .json({ message: "Book name and author are required" });
  }
  if (typeof newBook.name !== "string" || typeof newBook.author !== "string") {
    return res
      .status(400)
      .json({ message: "Book name and author must be strings" });
  }
  try {
    books.push(newBook);
    res.status(200).json(books);
    console.log("Adding book successfully", newBook);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error adding book");
  }
});

// Put
app.put("/update-book/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  if (!updatedBook.name || !updatedBook.author) {
    return res
      .status(400)
      .json({ message: "Book name and author are required" });
  }
  if (
    typeof updatedBook.name !== "string" ||
    typeof updatedBook.author !== "string"
  ) {
    return res
      .status(400)
      .json({ message: "Book name and author must be strings" });
  }
  try {
    const bookIndex = books.findIndex((item) => item.id == bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    const finalBook = (books[bookIndex] = {
      ...books[bookIndex],
      ...updatedBook,
    });
    res.status(200).json(finalBook);
    console.log("Updating book successfully", finalBook);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error updating book");
  }
});

// Delete
app.delete("/delete-book/:id", (req, res) => {
  try {
    const bookId = req.params.id;
    const bookIndex = books.findIndex((item) => item.id == bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
    books.splice(bookIndex, 1);
    res.status(200).json(books);
    console.log("Book deleted successfully", bookId);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error, "Error deleting book");
  }
});

// Sets the server to listen on the port, and the function to be run after the server starts listening successfully
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
