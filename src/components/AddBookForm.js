import React, { useState } from "react";
import styled from "styled-components";

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !price || !publishedDate) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);

    const newBook = {
      title,
      author,
      price: parseFloat(price),
      publishedDate,
    };

    try {
      await onBookAdded(newBook);
      setTitle("");
      setAuthor("");
      setPrice("");
      setPublishedDate("");
      setError("");
      //   alert("Book added successfully.");
    } catch (err) {
      console.error("Failed to add Book.", err);
      setError("Failed to add book");
    }
  };

  return (
    <FormContainer>
      <FormHeader>Add a New Book</FormHeader>
      <Form onSubmit={handleSubmit}>
        <label>Book Title:</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <br />
        <label>Author:</label>
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <br />
        <label>Price:</label>
        <Input
          type="number"
          value={price}
          min="0"
          step="0.01"
          onChange={(e) =>
            setPrice(
              e.target.value === "" ? "" : parseFloat(e.target.value) || 0
            )
          }
          placeholder="Price"
          required
        />
        <br />
        <label>Published Date:</label>
        <Input
          type="date"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
        />
        <br />
        <SubmitButton type="submit">Add Book</SubmitButton>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Form>
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormHeader = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 3px #007bff;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default AddBookForm;
