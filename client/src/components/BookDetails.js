import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBookQuery } from "../queries/queries";

const BookDetails = props => {
  const { bookId } = props;
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: bookId}
  });
  console.log(data, bookId);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  const displayBookDetails = () => {
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
