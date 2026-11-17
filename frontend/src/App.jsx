import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card'
import AddBillModal from './AddBillModal'
import AddCardModal from './AddCardModal'
import { API_URL } from './api'

function App() {
  // const [books, setBooks] = useState([]);
  // const [title, setTitle] = useState("");
  // const [releaseYear, setReleaseYear] = useState("");

  // const [newTitle, setNewTitle] = useState("")
  
  // const handleClear = () => {
  //   setTitle("");
  //   setReleaseYear("");
  // }

  // useEffect(() => {
  //   fetchBooks();
  // }, []);

  // const fetchBooks = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/books/");
  //     const data = await response.json();
  //     setBooks(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const addBook = async () => {
  //   const bookData = {
  //     title,
  //     release_year: releaseYear,
  //   }
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookData),
  //     });

  //     const data = await response.json();
  //     setBooks((prev) => [...prev, data]);
  //     setTitle("");
  //     setReleaseYear("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const updateTitle = async (pk, release_year) => {
  //   const bookData = {
  //     title: newTitle,
  //     release_year,
  //   };
  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookData),
  //   });

  //   const data = await response.json();
  //   setBooks((prev) => 
  //     prev.map((book) => {
  //       if (book.id === pk) {
  //         return data;
  //       } else {
  //         return book;
  //       }
  //     })
  //   );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const deleteBook = async (pk) => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
  //       method: "DELETE",
  //     });

  //     // This is different... we don't need the "await response.json()" because
  //     // we're deleting the book, so in views.py under book_detail(), we don't
  //     // even return any serialized JSON data for "DELETE" -- just an HTTP status

  //     // Now we'll delete it with setBooks() but using .filter
  //     setBooks((prev) => prev.filter((book) => book.id !== pk));

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const [cards, setCards] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBill, setShowAddBill] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    Promise.all([fetchCards(), fetchBills()]).finally(() => setLoading(false));
  }, []);

  const fetchCards = async () => {
    // setCards([]);
    try {
      const response = await fetch(`${API_URL}/cards/`);
      const data = await response.json();
      setCards(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBills = async () => {
    setBills([]);
    // try {
    //   const response = await fetch(`${API_URL}/bills/`);
    //   const data = await response.json();
    //   setBills(data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleBillCreated = (bill) => {
    setBills((prev) => [...prev, bill]);
    setShowAddBill(false);
  };

  const handleCardCreated = (card) => {
    setCards((prev) => [...prev, card]);
    setShowAddCard(false);
  };

  return (
    <>
      <h1>Bill Tracker Website</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          {bills.length === 0 && (
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <span>You don't have any bills yet.</span>
              <button className="btn btn-primary" onClick={() => setShowAddBill(true)}>Add bill</button>
            </div>
          )}

          {cards.length === 0 && (
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <span>You have no cards on file.</span>
              <button className="btn btn-primary" onClick={() => setShowAddCard(true)}>Add card</button>
            </div>
          )}

          {bills.length > 0 && (
            <div className="container-fluid bills-list card">
              <div className="list-group">
                <h3>Unassigned Bills</h3>
                {[...bills]
                  .sort((a, b) => a.company.localeCompare(b.company))
                  .map((bill) => (
                    <a key={bill.id} href="#" className="list-group-item list-group-item-action text-align-left">{bill.company}</a>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showAddBill && (
        <AddBillModal
          cards={cards}
          onClose={() => setShowAddBill(false)}
          onCreated={handleBillCreated}
        />
      )}
      {showAddCard && (
        <AddCardModal
          onClose={() => setShowAddCard(false)}
          onCreated={handleCardCreated}
        />
      )}
    </>
  )
}

export default App
