

import React, { useState } from 'react';

function GrammarLessonPage() {
  
  const quizQuestions = [
    {
      id: 1,
      question: 'Translate the following sentence into Russian: "Manuscripts don\'t burn."',
      options: {
        A: 'Рукописи сгорают',
        B: 'Рукописи горят',
        C: 'Рукописи не горят',
        D: 'Рукописи будут гореть',
      },
      correctAnswer: 'C',
      explanation: '"Manuscripts" translates to "Рукописи," and "don\'t burn" translates to "не горят."',
    },
    {
      id: 2,
      question: 'Choose the correct form of the verb to complete the sentence: "Woland ____ to Moscow."',
      options: {
        A: 'приехал',
        B: 'приехал',
        C: 'приехала',
        D: 'приехали',
      },
      correctAnswer: 'A',
      explanation: '"Woland" is a masculine singular noun, so the correct past tense form is "приехал."',
    },
    {
      id: 3,
      question: 'Select the English translation for the Russian phrase: "Кот Бегемот"',
      options: {
        A: 'Dog Behemoth',
        B: 'Cat Behemoth',
        C: 'Mouse Behemoth',
        D: 'Bird Behemoth',
      },
      correctAnswer: 'B',
      explanation: '"Кот" translates to "Cat" in English.',
    },
    {
      id: 4,
      question: 'Fill in the blank with the correct case of the noun: "Мастер дал ____ (his manuscript) Воланду."',
      options: {
        A: 'свой рукопись',
        B: 'свой рукописью',
        C: 'свою рукопись',
        D: 'своих рукописей',
      },
      correctAnswer: 'C',
      explanation: '"Рукопись" is a feminine noun, and in this sentence, it needs the accusative case, which is "свою рукопись."',
    },
  ];

 
  const [userAnswers, setUserAnswers] = useState({});
  
  const [result, setResult] = useState(null);

  
  const handleChange = (questionId, selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: selectedOption,
    });
  };

  
  const handleSubmit = async () => {
    
    let score = 0;
    const detailedResults = quizQuestions.map((q) => {
      const isCorrect = userAnswers[q.id] === q.correctAnswer;
      if (isCorrect) score += 1;
      return {
        ...q,
        userAnswer: userAnswers[q.id],
        isCorrect,
      };
    });

    
    const passed = score >= 3;

    
    try {
      const res = await fetch('http://localhost:3000/api/progress/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          bookTitle: 'Master and Margarita',
          completedLessonType: 'Grammar',
          answers: userAnswers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Error submitting quiz.');
        return;
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again later.');
      return;
    }

    
    setResult({
      score,
      passed,
      detailedResults,
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Master and Margarita - Grammar Quiz</h1>
      {quizQuestions.map((q) => (
        <div key={q.id} style={{ marginBottom: '30px' }}>
          <h3>
            Question {q.id}: {q.question}
          </h3>
          <div>
            {Object.entries(q.options).map(([optionKey, optionValue]) => (
              <div key={optionKey} style={{ marginBottom: '10px' }}>
                <label>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={optionKey}
                    checked={userAnswers[q.id] === optionKey}
                    onChange={() => handleChange(q.id, optionKey)}
                  />
                  <strong> {optionKey})</strong> {optionValue}
                </label>
              </div>
            ))}
          </div>
          {/* Display explanation after submission */}
          {result && (
            <div style={{ marginTop: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
              {result.detailedResults.find((res) => res.id === q.id)?.isCorrect ? (
                <p style={{ color: 'green' }}>Correct!</p>
              ) : (
                <p style={{ color: 'red' }}>
                  Incorrect. <strong>Correct Answer:</strong> {q.correctAnswer}) {q.options[q.correctAnswer]}
                </p>
              )}
              <p>
                <em>Explanation: {q.explanation}</em>
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Show submit button only if the quiz hasn't been submitted yet */}
      {!result && (
        <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Submit Quiz
        </button>
      )}

      {/* Display the overall result */}
      {result && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
          <h2>
            You scored {result.score} out of {quizQuestions.length}
          </h2>
          {result.passed ? (
            <p style={{ color: 'green' }}>Congratulations! You passed the Grammar Quiz.</p>
          ) : (
            <p style={{ color: 'red' }}>You did not pass the Grammar Quiz. Please review the explanations and try again.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default GrammarLessonPage;
