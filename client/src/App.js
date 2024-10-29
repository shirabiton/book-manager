import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import AddBook from "./components/AddBook/AddBook";
import UpdateBook from "./components/UpdateBook/UpdateBook";
import DeleteBook from "./components/DeleteBook/DeleteBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />}></Route>
        <Route path="/book-list" element={<BookList />}></Route>
        <Route path="/book-details/:bookId" element={<BookDetails />}></Route>
        <Route path="/add-book" element={<AddBook />}></Route>
        <Route path="/update-book/:bookId" element={<UpdateBook />}></Route>
        <Route path="/delete-book/:bookId" element={<DeleteBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
