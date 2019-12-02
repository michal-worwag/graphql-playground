import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selected, setSelected] = useState();
  const { loading, error, data } = useQuery(getBooksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  const { books } = data;
  const bookListItems = books.map(book => {
    return (
      <li
        key={book.id}
        onClick={() => {
          setSelected(book.id);
        }}
      >
        {book.name}
      </li>
    );
  });

  return (
    <div>
      <ul id="book-list">{bookListItems}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
