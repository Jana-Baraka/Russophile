

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MasterAndMargaritaPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const lessons = [
    { title: 'Lesson 1: Grammar', type: 'grammar' },
    { title: 'Lesson 2: Vocab', type: 'vocab' },
    { title: 'Lesson 3: General', type: 'general' },
    { title: 'Lesson 4: Final Test', type: 'final' },
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

  const handleLessonClick = async (lessonType) => {
    if (username) {
      
      try {
        const res = await fetch('http://localhost:3000/api/progress/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ bookTitle: 'Master and Margarita' }),
        });
        const data = await res.json();
        if (res.ok) {
          alert('Book track started successfully!');
        } else {
          alert(data.message || 'Error starting book track.');
        }
      } catch (err) {
        console.error('Error starting book track:', err);
        alert('Failed to start book track. Navigating to lesson without tracking.');
      }
    }
    
    navigate(`/lessons/master-and-margarita/${lessonType}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Top-right welcome message */}
      <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
        {username && `добро пожаловать, ${username}`}
      </div>

      <h1>Master and Margarita</h1>
      <p>A philosophical novel by Michail Bulgakov delving into faith and free will.</p>

      <h2>Lessons</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {lessons.map((lesson, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <button
              onClick={() => handleLessonClick(lesson.type)}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#f0f0f0',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {lesson.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MasterAndMargaritaPage;
