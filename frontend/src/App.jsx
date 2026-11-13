import { use, useEffect, useState } from 'react'
import './App.css'
import Card from './Card'

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  const [newTitle, setNewTitle] = useState("")
  
  const handleClear = () => {
    setTitle("");
    setReleaseYear("");
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear,
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
      setTitle("");
      setReleaseYear("");
    } catch (err) {
      console.log(err);
    }
  }

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });

    const data = await response.json();
    setBooks((prev) => 
      prev.map((book) => {
        if (book.id === pk) {
          return data;
        } else {
          return book;
        }
      })
    );
    } catch (err) {
      console.log(err);
    }
  }

  const deleteBook = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "DELETE",
      });

      // This is different... we don't need the "await response.json()" because
      // we're deleting the book, so in views.py under book_detail(), we don't
      // even return any serialized JSON data for "DELETE" -- just an HTTP status

      // Now we'll delete it with setBooks() but using .filter
      setBooks((prev) => prev.filter((book) => book.id !== pk));

    } catch (err) {
      console.log(err);
    }
  }

  // const haveBooks = books?.length > 0 ? (<h1>We have books</h1>) : (<h1>Oops! We have no books.</h1>)

  return (
    <>
      <h1>Book Website</h1>
      {/* {haveBooks} */}
      {books?.length > 0 ? (<h1>We have books</h1>) : (<h1>Oops! We have no books.</h1>)}
      <div>
        <input
          type="text" 
          placeholder='Book Title...' 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="number" 
          placeholder='Release Date...' 
          onChange={(e) => setReleaseYear(e.target.value)}
          value={releaseYear}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {books.map((book) => (
        <div>
          <p>Title: {book.title}</p>
          <p>Release Year: {book.release_year}</p>
          <input type="text" 
            placeholder='New Title...'
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={() => updateTitle(book.id, book.release_year)}>
            Change Title
          </button>
          <button 
            onClick={() => deleteBook(book.id)}> Delete</button>
        </div>
      ))}
      <div id="card-col" className="col-sm-6 text-center">
        <Card className="card" title="Test title" subtitle="subtitle" body="This is the body of my book card." />
      </div>
    </>
  )
}

export default App
