import React, { useState } from 'react';

const BookList = ({ books }) => {
  const [booksState, setBookState] = useState(books);
  return (
    <div>
      <h1>Booklist</h1>
      <ul>
        {booksState.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
