
import { useEffect, useState } from 'react';

function LessonsPage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/lessons', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Lessons</h1>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default LessonsPage;
