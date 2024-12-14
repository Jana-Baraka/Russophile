import React, { useState } from 'react';

function BookTrackPage() {
  const [completed, setCompleted] = useState({
    Grammar: false,
    Vocab: false,
    General: false,
    Final: false
  });

  
  const [grammarAnswers, setGrammarAnswers] = useState(["","","",""]); 
  

  const handleAnswerChange = (lessonKey, index, value) => {
    if (lessonKey === 'Grammar') {
      const newArr = [...grammarAnswers];
      newArr[index] = value;
      setGrammarAnswers(newArr);
    }
    
  };

  const submitQuiz = async (lessonKey, answersArray) => {
    try {
      const res = await fetch('http://localhost:3000/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          bookTitle: 'Master and Margarita', 
          completedLessonType: lessonKey, 
          answers: answersArray 
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setCompleted(prev => ({ ...prev, [lessonKey]: true }));
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting quiz');
    }
  };

  const canStartVocab = completed.Grammar;
  const canStartGeneral = completed.Vocab;
  const canStartFinal = completed.General;


  const renderMultipleChoice = (lessonKey, answers, setAnswerFn) => (
    <div style={{display:'flex', flexDirection:'column', gap:'10px', marginTop:'10px'}}>
      {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
        <div key={i}>
          <span>{q}: </span>
          <select value={answers[i]} onChange={e => handleAnswerChange(lessonKey, i, e.target.value)}>
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <h1>Master and Margarita - Book Track</h1>
      <p>Complete each lesson by passing the quiz (3/4 correct) before the next is unlocked.</p>

      {/* Lesson 1: Grammar */}
      <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center', marginBottom:'20px' }}>
        <h3>Lesson 1: Grammar</h3>
        {!completed.Grammar && (
          <>
            {renderMultipleChoice('Grammar', grammarAnswers)}
            <button 
              style={{ marginTop:'10px' }}
              onClick={() => submitQuiz('Grammar', grammarAnswers)} 
            >
              Submit Quiz
            </button>
          </>
        )}
        {completed.Grammar && <p>Completed</p>}
      </div>

      {/* Similarly for Vocab, General, Final - each with its own quiz and dependencies */}
      <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center', marginBottom:'20px', opacity: canStartVocab ? 1 : 0.5 }}>
        <h3>Lesson 2: Vocab</h3>
        {completed.Grammar && !completed.Vocab && (
          <>
            {/* Add Vocab quiz similar to grammar */}
            <p>Vocab quiz goes here</p>
            <button onClick={() => submitQuiz('Vocab', ["A","A","A","A"])}>Submit Quiz</button>
          </>
        )}
        {completed.Vocab && <p>Completed</p>}
        {!completed.Grammar && <p style={{ color:'red' }}>Complete Grammar first</p>}
      </div>

      <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center', marginBottom:'20px', opacity: canStartGeneral ? 1 : 0.5 }}>
        <h3>Lesson 3: General</h3>
        {completed.Vocab && !completed.General && (
          <>
            {/* Add General quiz */}
            <p>General quiz goes here</p>
            <button onClick={() => submitQuiz('General', ["A","A","A","A"])}>Submit Quiz</button>
          </>
        )}
        {completed.General && <p>Completed</p>}
        {!completed.Vocab && <p style={{ color:'red' }}>Complete Vocab first</p>}
      </div>

      <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center', marginBottom:'20px', opacity: canStartFinal ? 1 : 0.5 }}>
        <h3>Lesson 4: Final Test</h3>
        {completed.General && !completed.Final && (
          <>
            {/* Add Final quiz */}
            <p>Final Test quiz goes here</p>
            <button onClick={() => submitQuiz('Final', ["A","A","A","A"])}>Submit Quiz</button>
          </>
        )}
        {completed.Final && <p>Completed</p>}
        {!completed.General && <p style={{ color:'red' }}>Complete General first</p>}
      </div>
    </div>
  );
}

export default BookTrackPage;
