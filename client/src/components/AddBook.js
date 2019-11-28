import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation
} from "../queries/queries";

const AddBook = () => {
  const [name, setName] = useState();
  const [genre, setGenre] = useState();
  const [authorId, setAuthorId] = useState();

  const [addBook, { dane }] = useMutation(addBookMutation);

  const { loading, error, data } = useQuery(getAuthorsQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  const { authors } = data;
  const authorSelectItems = authors.map(({ id, name }) => {
    return (
      <option key={id} value={id}>
        {name}
      </option>
    );
  });

  const submitForm = e => {
    e.preventDefault();
    console.log(name, genre, authorId);
    addBook({
      variables: { name: name, genre: genre, authorId: authorId },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={e => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {authorSelectItems}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
