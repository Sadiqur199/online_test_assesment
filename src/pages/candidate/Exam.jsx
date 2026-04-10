// pages/candidate/Exam.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExamStore } from '../../store/useExamStore';

export default function Exam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = useExamStore((state) => state.exams.find((e) => e.id === parseInt(id)));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exam?.duration ? parseInt(exam.duration) * 60 : 1800);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const candidateName = localStorage.getItem('candidateName') || 'Candidate';

  useEffect(() => {
    if (!exam) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeoutReached(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [exam]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value) => {
    const question = exam.questions[currentQuestion];
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Save answers to localStorage
    localStorage.setItem(`exam_${id}_answers`, JSON.stringify(answers));
  };

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Exam not found</p>
          <button onClick={() => navigate('/candidate/dashboard')} className="mt-4 text-indigo-600">Go Back</button>
        </div>
      </div>
    );
  }

  // Timeout Screen
  if (timeoutReached && !submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Timeout!</h2>
          <p className="text-gray-600">
            Dear {candidateName}, Your exam time has been finished. Thank you for participating.
          </p>
          <button
            onClick={() => navigate('/candidate/dashboard')}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Test Completed!</h2>
          <p className="text-gray-600">
            Congratulations! {candidateName}, You have completed your MCQ Exam for {exam.title}. Thank you for participating.
          </p>
          <button
            onClick={() => navigate('/candidate/dashboard')}
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = exam.questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="font-bold text-indigo-700">{exam.title}</h1>
            <p className="text-sm text-gray-500">Question ({currentQuestion + 1}/{exam.questions.length})</p>
          </div>
          <div className={`font-mono font-bold px-4 py-1 rounded-full ${timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>
            {formatTime(timeLeft)} left
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Q{currentQuestion + 1}. {currentQ.title}
          </h3>
          
          {currentQ.type === 'text' ? (
            <textarea
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              rows="6"
              placeholder="Write your answer here..."
              value={currentAnswer || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          ) : (
            <div className="space-y-3">
              {currentQ.options.map((opt, optIdx) => (
                <label key={optIdx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type={currentQ.type === 'radio' ? 'radio' : 'checkbox'}
                    name={`question${currentQ.id}`}
                    value={opt}
                    checked={currentQ.type === 'radio' 
                      ? currentAnswer === opt 
                      : (currentAnswer || []).includes(opt)}
                    onChange={() => {
                      if (currentQ.type === 'radio') {
                        handleAnswerChange(opt);
                      } else {
                        const current = currentAnswer || [];
                        if (current.includes(opt)) {
                          handleAnswerChange(current.filter(v => v !== opt));
                        } else {
                          handleAnswerChange([...current, opt]);
                        }
                      }
                    }}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">{String.fromCharCode(65 + optIdx)}. {opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleSkip}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Skip this Question
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {currentQuestion === exam.questions.length - 1 ? 'Submit Exam' : 'Save & Continue'}
          </button>
        </div>
      </main>

      <footer className="border-t mt-8 py-4 text-center text-xs text-gray-400">
        Powered by AKJ RESOURCE | Helpline +88 011020202505 | support@akj.work
      </footer>
    </div>
  );
}