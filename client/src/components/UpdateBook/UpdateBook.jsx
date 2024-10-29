import "../FormStyle.css";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const UpdateBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [book, setBook] = useState({});

  useEffect(() => {
    const findSelectedBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-book/${bookId}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBook(data);
          setName(data.name);
          setAuthor(data.author);
          console.log(data);
        } else {
          console.error("Failed to fetch book:", response.statusText);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    findSelectedBook();
  }, []);

  const updateBookRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/update-book/${bookId}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name: name, author: author }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Book was updated successfully", data);
        navigate("/book-list");
      } else {
        console.error("Error updating book", response.statusText);
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
      <h1>Update Book</h1>
      {book && (
        <form onSubmit={updateBookRequest}>
          <label htmlFor="book-name">
            Book name:
            <input
              type="text"
              id="book-name"
              maxLength="25"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label htmlFor="book-author">
            Author name:
            <input
              type="text"
              id="book-author"
              maxLength="20"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <input type="submit" value="update" />
        </form>
      )}
    </>
  );
};

export default UpdateBook;
