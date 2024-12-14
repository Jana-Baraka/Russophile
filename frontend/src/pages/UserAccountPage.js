import React, { useEffect, useState } from 'react';

function UserAccountPage() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState('');
  const [username, setUsername] = useState(''); 

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/progress', {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setTracks(data);
        } else {
          setError(data.message || 'Failed to fetch progress');
        }
      } catch (err) {
        setError('Error fetching progress');
        console.error(err);
      }
    };

    const fetchUser = async () => { 
      try {
        const res = await fetch('http://localhost:3000/api/auth/me', {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setUsername(data.username); 
        } else {
          setError(data.message || 'Failed to fetch user details');
        }
      } catch (err) {
        setError('Error fetching user details');
        console.error(err);
      }
    };

    fetchProgress();
    fetchUser(); 
  }, []);

  const deleteTrack = async (bookTitle) => {
    try {
      const res = await fetch('http://localhost:3000/api/progress/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bookTitle })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setTracks(tracks.filter(t => t.bookTitle !== bookTitle));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error deleting track');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {username}. Давайте читать!</h1> {/* Display the username */}
      <h2>Your Book Tracks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tracks.map(track => (
          <li key={track.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <h3>{track.bookTitle}</h3>
            <p>Lessons Completed: {track.lessonsCompleted} / 4</p>
            {track.isBookFinished && <p style={{ color: 'green' }}>Book Finished!</p>}
            <button onClick={() => deleteTrack(track.bookTitle)}>Delete Track</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserAccountPage;
