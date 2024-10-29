import "../FormStyle.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const AddBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const addBookRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, author: author }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Book added successfully", data);
      } else {
        console.error("Failed to add new book:", response.statusText);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Link to="/book-list" title="go back">
        <Icon icon="openmoji:left-arrow" />
      </Link>
      <h1>Add Book</h1>
      <form action="/book-list" onSubmit={addBookRequest}>
        <label htmlFor="book-name">
          Book name
          <input
            type="text"
            id="book-name"
            placeholder="what is the name of the book?"
            maxLength="25"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="book-author">
          Author name
          <input
            type="text"
            id="book-author"
            placeholder="what is the author's name?"
            maxLength="20"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <input type="submit" value="add" />
      </form>
    </>
  );
};

export default AddBook;
