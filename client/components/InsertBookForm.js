import React, { useState } from 'react';

const InsertBookForm = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newBookPageCount, setNewBookPageCount] = useState('');

  return (
    <form className='mb-4'>
      <input
        type='text'
        className='border rounded p-2'
        placeholder='Book title'
        name='title'
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type='number'
        placeholder='Page count'
        className='border rounded p-2'
        value={newBookPageCount}
        onChange={(e) => setNewBookPageCount(e.target.value)}
      />
      <select
        className='border rounded p-2'
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
      >
        <option value='' defaultValue disabled>
          Choose an author
        </option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name} {author.surname}
          </option>
        ))}
      </select>
    </form>
  );
};

export default InsertBookForm;
