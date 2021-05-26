import BookList from '../components/BookList';
import InsertBookForm from '../components/InsertBookForm';

export default function Home({ books, authors }) {
  return (
    <div className='container max-w-7xl pt-8 mx-auto'>
      <h1 className='text-4xl font-medium mb-5'>BookList</h1>
      <InsertBookForm authors={authors} />
      <BookList books={books} />
    </div>
  );
}

export async function getStaticProps() {
  const books = await (await fetch('http://localhost:5000/books')).json();
  const authors = await (await fetch('http://localhost:5000/authors')).json();

  return {
    props: { books, authors },
  };
}
