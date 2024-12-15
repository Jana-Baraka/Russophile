import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import '../styles/LessonsPage.css'; 

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
    <div className="lessons-page">
      <div className="welcome-message">
        {username && `добро пожаловать, ${username}`}
      </div>
      <h1 className="page-title">Available Books</h1>
      <ul className="lessons-list">
        {predefinedLessons.map((book, index) => (
          <motion.li
            key={index}
            className="lesson-card"
            onClick={() => handleBookClick(book.title)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3>{book.title}</h3>
            <p>{book.content}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default LessonsPage;
