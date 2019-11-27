import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const AddBook = () => {
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

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select Author</option>
          {authorSelectItems}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
