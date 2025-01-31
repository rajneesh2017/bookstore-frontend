import BooksTable from "./components/BooksTable";
import AddBookForm from "./components/AddBookForm";
import useBooks from "./hooks/UseBooks";
import styled from "styled-components";

function App() {
  const {
    books,
    isLoading,
    error,
    addBookToList,
    updateBookInList,
    deleteBookFromList,
  } = useBooks();
  return (
    <AppContainer>
      <Header>Welcome to the Bookstore</Header>
      {error && <ErrorText style={{ color: "red" }}>{error}</ErrorText>}
      {isLoading ? (
        <LoadingText>Loading Books...</LoadingText>
      ) : (
        <>
          <AddBookForm onBookAdded={addBookToList} />
          <BooksTable
            books={books}
            onEditBook={updateBookInList}
            onDeleteBook={deleteBookFromList}
          />
        </>
      )}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: ariel, san-serif;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #34495e;
`;

export default App;
