// pages/candidate/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore } from '../../store/useExamStore';
import { ClockIcon, DocumentTextIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [candidateName, setCandidateName] = useState('');
  const [candidateTestId, setCandidateTestId] = useState('');
  const [availableExams, setAvailableExams] = useState([]);
  const getExamsByTestId = useExamStore((state) => state.getExamsByTestId);
  const exams = useExamStore((state) => state.exams);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('candidateAuth');
    const name = localStorage.getItem('candidateName');
    const testId = localStorage.getItem('candidateTestId');

    if (!auth || !name || !testId) {
      navigate('/candidate/login');
      return;
    }

    setCandidateName(name);
    setCandidateTestId(testId);

    // Get exams available for this test ID
    const available = getExamsByTestId(testId);
    setAvailableExams(available);
  }, [navigate, getExamsByTestId]);

  const handleLogout = () => {
    localStorage.removeItem('candidateAuth');
    localStorage.removeItem('candidateName');
    localStorage.removeItem('candidateTestId');
    navigate('/candidate/login');
  };

  const handleStartExam = (exam) => {
    // Check if exam is within time window
    const now = new Date();
    const startTime = new Date(exam.startTime);
    const endTime = new Date(exam.endTime);

    if (now < startTime) {
      alert(`This exam will be available from ${new Date(exam.startTime).toLocaleString()}`);
      return;
    }

    if (now > endTime) {
      alert('This exam has expired. You cannot take it anymore.');
      return;
    }

    localStorage.setItem('currentExamId', exam.id);
    navigate(`/exam/${exam.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AKJ RESOURCE</h1>
            <p className="text-sm text-gray-500">Candidate Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{candidateName}</p>
              <p className="text-xs text-gray-500">Test ID: {candidateTestId}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {candidateName}!</h2>
          <p className="text-gray-600 mt-1">Here are your available tests</p>
        </div>

        {availableExams.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentTextIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">No Tests Available</h3>
            <p className="text-gray-500 mt-1">There are no tests assigned to your Test ID.</p>
            <p className="text-gray-400 text-sm mt-2">Please contact your administrator if you believe this is an error.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-3">
                    {exam.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Duration: {exam.duration || 30} minutes</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DocumentTextIcon className="w-4 h-4 mr-2 text-gray-400" />
                      <span>Questions: {exam.questions?.length || 0}</span>
                    </div>
                    {exam.startTime && (
                      <div className="text-xs text-gray-500 mt-2">
                        <p>Available from: {new Date(exam.startTime).toLocaleString()}</p>
                        <p>Until: {new Date(exam.endTime).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleStartExam(exam)}
                    className="w-full flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Start Test
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t mt-12 py-6 text-center text-xs text-gray-400">
        Powered by AKJ RESOURCE | Helpline +88 011020202505 | support@akj.work
      </footer>
    </div>
  );
}