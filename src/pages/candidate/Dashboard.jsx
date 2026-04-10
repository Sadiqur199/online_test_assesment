// pages/candidate/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore } from '../../store/useExamStore';

export default function CandidateDashboard() {
  const exams = useExamStore((state) => state.exams);
  const navigate = useNavigate();
  const [candidateName, setCandidateName] = useState('');
  const [availableTests, setAvailableTests] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem('candidateName');
    const testId = localStorage.getItem('currentTestId');
    setCandidateName(name || 'Candidate');
    
    // Show only the test that matches the candidate's test ID
    if (testId) {
      const assignedTest = exams.find(exam => exam.id.toString() === testId);
      if (assignedTest) {
        setAvailableTests([assignedTest]);
      }
    }
  }, [exams]);

  const handleLogout = () => {
    localStorage.removeItem('candidateAuth');
    localStorage.removeItem('candidateName');
    localStorage.removeItem('currentTestId');
    navigate('/candidate/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-indigo-700">AKJ RESOURCE</h1>
          <p className="text-sm text-gray-500">Online Test Platform</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {candidateName}</span>
          <button onClick={handleLogout} className="text-red-500 text-sm hover:text-red-700">Logout</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800">Your Assigned Tests</h2>
          </div>

          {availableTests.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500">No tests assigned to you yet.</p>
              <p className="text-sm text-gray-400 mt-2">Please contact your administrator.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableTests.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-5 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{exam.title}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Duration:</span> {exam.duration || '30'} minutes
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Total Questions:</span> {exam.questions?.length || 0}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Question Sets:</span> {exam.questionSets || exam.sets || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/exam/${exam.id}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                      Start Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t mt-12 py-6 text-center text-xs text-gray-400">
        Powered by AKJ RESOURCE | Helpline +88 011020202505 | support@akj.work
      </footer>
    </div>
  );
}