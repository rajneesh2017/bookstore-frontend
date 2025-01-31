import axios from "axios";

const API_URL = "https://localhost:7094/api/books";

export const fetchBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

export const updateBook = async (id, updatedBook) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedBook);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
