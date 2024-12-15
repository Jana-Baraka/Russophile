import { useState } from 'react';
import { motion } from 'framer-motion'; 
import '../styles/AdminPage.css'; 

function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const createLesson = async () => {
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
        credentials: 'include',
      });
      if (res.ok) {
        setMessage('Lesson created successfully!');
        setTitle('');
        setContent('');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to create lesson');
      }
    } catch (error) {
      console.error('Error creating lesson:', error);
      setMessage('Error creating lesson');
    }
  };

  return (
    <div className="admin-page">
      <motion.h1 
        className="admin-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Panel
      </motion.h1>
      <motion.div 
        className="form-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Lesson Title"
        />
        <textarea
          className="textarea-field"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Lesson Content"
        ></textarea>
        <motion.button
          className="create-button"
          onClick={createLesson}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Lesson
        </motion.button>
        {message && <p className="message">{message}</p>}
      </motion.div>
    </div>
  );
}

export default AdminPage;
