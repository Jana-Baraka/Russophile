import React, { useState } from 'react';

function BookTrackPage() {

  
  const [completedLessons, setCompletedLessons] = useState({
    grammar: false,
    vocab: false,
    general: false,
    finalTest: false
  });

  const handleCompleteLesson = (lessonKey) => {
   
    setCompletedLessons(prev => ({ ...prev, [lessonKey]: true }));
  };

  
  const finalEnabled = completedLessons.grammar && completedLessons.vocab && completedLessons.general;

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <h1>Master and Margarita - Book Track</h1>
      <p>Complete the first three lessons before the final test.</p>
      <div style={{ marginTop:'30px', display:'flex', flexDirection:'column', gap:'20px' }}>
        {/* Grammar Lesson */}
        <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center' }}>
          <h3>Lesson 1: Grammar</h3>
          <button 
            onClick={() => handleCompleteLesson('grammar')} 
            disabled={completedLessons.grammar} 
            style={{ padding:'10px', marginTop:'10px', cursor: completedLessons.grammar ? 'not-allowed':'pointer' }}>
            {completedLessons.grammar ? 'Completed' : 'Start / Complete'}
          </button>
        </div>

        {/* Vocab Lesson */}
        <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center' }}>
          <h3>Lesson 2: Vocab</h3>
          <button 
            onClick={() => handleCompleteLesson('vocab')} 
            disabled={!completedLessons.grammar || completedLessons.vocab} 
            style={{ padding:'10px', marginTop:'10px', cursor: (!completedLessons.grammar || completedLessons.vocab) ? 'not-allowed':'pointer' }}>
            {completedLessons.vocab ? 'Completed' : 'Start / Complete'}
          </button>
          {!completedLessons.grammar && <p style={{ color:'red', fontSize:'14px' }}>Complete Grammar first</p>}
        </div>

        {/* General Lesson */}
        <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center' }}>
          <h3>Lesson 3: General</h3>
          <button 
            onClick={() => handleCompleteLesson('general')} 
            disabled={!completedLessons.vocab || completedLessons.general} 
            style={{ padding:'10px', marginTop:'10px', cursor: (!completedLessons.vocab || completedLessons.general) ? 'not-allowed':'pointer' }}>
            {completedLessons.general ? 'Completed' : 'Start / Complete'}
          </button>
          {!completedLessons.vocab && <p style={{ color:'red', fontSize:'14px' }}>Complete Vocab first</p>}
        </div>

        {/* Final Test */}
        <div style={{ border:'1px solid #ccc', padding:'10px', borderRadius:'5px', width:'300px', textAlign:'center' }}>
          <h3>Lesson 4: Final Test</h3>
          <button 
            onClick={() => handleCompleteLesson('finalTest')} 
            disabled={!finalEnabled || completedLessons.finalTest} 
            style={{ padding:'10px', marginTop:'10px', cursor: (!finalEnabled || completedLessons.finalTest) ? 'not-allowed':'pointer' }}>
            {completedLessons.finalTest ? 'Completed' : 'Take Final Test'}
          </button>
          {!finalEnabled && <p style={{ color:'red', fontSize:'14px' }}>Complete all previous lessons first</p>}
        </div>
      </div>
    </div>
  );
}

export default BookTrackPage;
