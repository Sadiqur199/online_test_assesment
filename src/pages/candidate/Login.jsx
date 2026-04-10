import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore } from '../../store/useExamStore';

export default function CandidateLogin() {
  const [name, setName] = useState('');
  const [testId, setTestId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const exams = useExamStore((state) => state.exams);

  const handleLogin = (e) => {
    e.preventDefault();

    const examExists = exams.find(
      (exam) => exam.id.toString() === testId
    );

    if (name && testId && examExists) {
      localStorage.setItem('candidateAuth', 'true');
      localStorage.setItem('candidateName', name);
      localStorage.setItem('currentTestId', testId);
      navigate('/candidate/dashboard');
    } else if (!examExists) {
      setError('Invalid Test ID. Please check and try again.');
    } else {
      setError('Please enter both name and test ID');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition"
        >
          ← Back
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">AKJ RESOURCE</h1>
          <p className="text-gray-500">Candidate Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test ID
            </label>
            <input
              type="text"
              placeholder="Enter your test ID"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium"
          >
            Start Test
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          Helpline +88 011020202505 | support@akj.work
        </div>
      </div>
    </div>
  );
}