

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LessonsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const predefinedLessons = [
    { title: 'War and Peace', content: 'A Russian classic by Leo Tolstoy set during the Napoleonic Wars.' },
    { title: 'Crime and Punishment', content: 'A novel by Fyodor Dostoevsky exploring morality and redemption.' },
    { title: 'Master and Margarita', content: 'A philosophical novel by Michail Bulgakov delving into faith and free will.' },
  ];

  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setUsername(data.username); 
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    fetchUser();
  }, []);

  const handleBookClick = (bookTitle) => {
    const formattedTitle = bookTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`/lessons/${formattedTitle}`);
  };

  return (
    <div style={{ position: 'relative', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Top-right welcome message */}
      <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
        {username && `добро пожаловать, ${username}`}
      </div>

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
              width: '100%',
              backgroundColor: '#f8f9fa',
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
