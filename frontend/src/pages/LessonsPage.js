import React from 'react';
import { useNavigate } from 'react-router-dom';

function LessonsPage() {
  const navigate = useNavigate();

  
  const predefinedLessons = [
    { title: 'War and Peace', content: 'A Russian classic by Leo Tolstoy set during the Napoleonic Wars.' },
    { title: 'Crime and Punishment', content: 'A novel by Fyodor Dostoevsky exploring morality and redemption.' },
    { title: 'Master and Margarita', content: 'A philosophical novel by Michail Bulgakov delving into faith and free will.' }
  ];

 
  const handleBookClick = (bookTitle) => {
    if (bookTitle === 'Master and Margarita') {
      navigate('/lessons/master-and-margarita'); 
    } else {
      alert('Book track not implemented yet!'); 
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Available Books</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {predefinedLessons.map((book, index) => (
          <li
            key={index}
            style={{
              margin: '20px 0',
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '300px',
              textAlign: 'center',
              backgroundColor: '#f8f9fa'
            }}
            onClick={() => handleBookClick(book.title)}
          >
            <h3>{book.title}</h3>
            <p>{book.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonsPage;
