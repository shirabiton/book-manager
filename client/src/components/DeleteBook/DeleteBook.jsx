import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const DeleteBook = () => {
  const { bookId } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const deleteBookRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/delete-book/${bookId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Deleted book successfully", data);
          setMessage("הספר נמחק בהצלחה");
        } else {
          console.error("Error deleting book", response.statusText);
          if (message === "") {
            setMessage("שגיאה במחיקת הספר");
          }
        }
      } catch (error) {
        console.error(error.message);
        if (message === "") {
          setMessage("שגיאה במחיקת הספר");
        }
      }
    };
    deleteBookRequest();
  }, [bookId]);

  return (
    <>
      <Link to="/book-list" title="go back">
        <Icon icon="openmoji:left-arrow" />
      </Link>
      {message && <p>{message}</p>}
    </>
  );
};

export default DeleteBook;
