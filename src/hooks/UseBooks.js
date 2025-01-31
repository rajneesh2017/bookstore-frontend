import { useState, useEffect } from "react";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../actions/bookService";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
      } catch (err) {
        setError("Failed to load books, Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadBooks();
  }, []);

  const addBookToList = async (newBook) => {
    try {
      const addedBook = await addBook(newBook);
      setBooks((previousBooks) => [...previousBooks, addedBook]);
    } catch (err) {
      setError("Failed to add book, please try again.");
    }
  };

  const updateBookInList = async (id, updatedBook) => {
    try {
      const updated = await updateBook(id, updatedBook);
      console.log("Updated book from backend:", updated);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? updated : book))
      );
      console.log("Books after update:", updated); // Log updated state
      return updated;
    } catch (err) {
      setError(err.message);
      console.error("Error updating book:", err);
    }
  };

  const deleteBookFromList = async (id) => {
    try {
      await deleteBook(id);
      setBooks((previousBooks) =>
        previousBooks.filter((book) => book.id !== id)
      );
    } catch (err) {
      setError("Failded to delete the Book, please try again.");
      console.error("Error deleting book:", err);
    }
  };

  return {
    books,
    isLoading,
    error,
    addBookToList,
    updateBookInList,
    deleteBookFromList,
  };
};
export default useBooks;
