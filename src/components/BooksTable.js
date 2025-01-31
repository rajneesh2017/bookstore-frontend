import React, { useState } from "react";
import styled from "styled-components";

const BooksTable = ({ books, onEditBook, onDeleteBook }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      (minPrice === "" || book.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || book.price <= parseFloat(maxPrice));

    return matchesSearch && matchesPrice;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / itemPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (book) => {
    setEditingBook({ ...book });
  };

  const handleSave = () => {
    if (editingBook) {
      console.log("Editing book before save:", editingBook);
      if (!editingBook.price || isNaN(editingBook.price)) {
        alert("Please enter a valid price.");
        return;
      }
      onEditBook(editingBook.id, editingBook);
      setEditingBook(null);
    }
  };
  const handleCancel = () => {
    setEditingBook(null); // Exit editing mode without saving
  };

  return (
    <Container>
      <Header>Books List</Header>
      {/*Search Input */}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      {/*Price Filter Inputs */}
      <FilterContainer>
        <FilterInput
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <FilterInput
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </FilterContainer>

      <BookList>
        {paginatedBooks.map((book) => (
          <li key={`${book.id}-${book.title}`}>
            {editingBook && editingBook.id === book.id ? (
              <EditingRow>
                <EditInput
                  type="text"
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  placeholder="Title"
                />
                <EditInput
                  type="text"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  placeholder="Author"
                />
                <EditInput
                  type="number"
                  value={
                    editingBook.price !== undefined ? editingBook.price : ""
                  }
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="Price"
                />
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </EditingRow>
            ) : (
              <BookRow>
                <BookDetails>
                  {book.title || "Untitled"} by {book.author || "Unknown"} - $
                  {book.price ? book.price.toFixed(2) : "0.00"}
                </BookDetails>

                <Button onClick={() => handleEditClick(book)}>Edit</Button>
                <Button onClick={() => onDeleteBook(book.id)}>Delete</Button>
              </BookRow>
            )}
          </li>
        ))}
      </BookList>
      {/*Pagination Controls*/}
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            active={currentPage === index + 1}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h2`
  color: #2c3e50;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
  padding: 8px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const BookList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BookRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const EditingRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const BookDetails = styled.span`
  flex-grow: 1;
`;

const EditInput = styled.input`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: ${({ secondary }) => (secondary ? "#e74c3c" : "#3498db")};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ secondary }) => (secondary ? "#c0392b" : "#2980b9")};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: ${({ active }) => (active ? "#3498db" : "white")};
  color: ${({ active }) => (active ? "white" : "#3498db")};
  border: 1px solid #3498db;
  border-radius: 4px;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
    color: white;
  }

  &:disabled {
    background-color: #bdc3c7;
    color: #7f8c8d;
    cursor: not-allowed;
  }
`;

export default BooksTable;
