
import { useState } from 'react';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createLesson = async () => {
    const res = await fetch('http://localhost:3000/api/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
      credentials: 'include'
    });
    if (res.ok) {
      alert("Lesson created!");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Lesson Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Lesson Content"></textarea>
      <button onClick={createLesson}>Create Lesson</button>
    </div>
  );
}

export default AdminPage;
