import "./BookDetails.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});

  const getBookRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get-book/${bookId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setBook(data);
        console.log(data);
      } else {
        console.error("Failed to fetch book:", response.statusText);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBookRequest();
  }, []);

  return (
    <>
      <Link to="/book-list" title="go back">
        <Icon icon="openmoji:left-arrow" />
      </Link>
      <div id="text-container">
        <h1>{book.name}</h1>
        <p>By: {book.author}</p>
      </div>
    </>
  );
};

export default BookDetails;
