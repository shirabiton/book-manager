import "./BookList.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooksRequest = async () => {
      try {
        const response = await fetch("http://localhost:5000", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
          console.log(data);
        } else {
          console.error("Failed to fetch books:", response.statusText);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getBooksRequest();
  }, []);

  return (
    <>
      <h1>Book Manager</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.name}
            <span className="icons-container">
              <span title="view">
                <Icon
                  icon="lsicon:view-filled"
                  width="20"
                  height="20"
                  onClick={() => {
                    navigate(`/book-details/${book.id}`);
                  }}
                />
              </span>
              <span title="edit">
                <Icon
                  icon="mdi:edit-outline"
                  width="20"
                  height="20"
                  onClick={() => navigate(`/update-book/${book.id}`)}
                />
              </span>
              <span title="delete">
                <Icon
                  icon="iconamoon:trash-fill"
                  width="20"
                  height="20"
                  onClick={() => navigate(`/delete-book/${book.id}`)}
                />
              </span>
            </span>
          </li>
        ))}
      </ul>
      <Link to="/add-book" id="add-book-link">
        <Icon icon="twemoji:plus" /> Add New Book
      </Link>
    </>
  );
};

export default BookList;
