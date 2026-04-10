// pages/employer/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore } from '../../store/useExamStore';
import { CalendarIcon, UserGroupIcon, DocumentDuplicateIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const exams = useExamStore((state) => state.exams);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('employerAuth');
    navigate('/employer/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">AKJ RESOURCE</h1>
            <p className="text-sm text-gray-500">Online Test Platform</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Ref: 01-0101213</span>
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Online Tests</h2>
          <button
            onClick={() => navigate('/employer/create')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition"
          >
            + Create Online Test
          </button>
        </div>

        {exams.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentDuplicateIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">No Online Test Available</h3>
            <p className="text-gray-500 mt-1">Currently, there are no online tests available. Please check back later for updates.</p>
            <button
              onClick={() => navigate('/employer/create')}
              className="mt-6 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition"
            >
              Create Your First Test
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-4 line-clamp-1">
                    {exam.title}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <UserGroupIcon className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Candidates: {exam.candidates || 'Not Set'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DocumentDuplicateIcon className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Question Sets: {exam.questionSets || exam.sets || 'Not Set'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Exam Slots: {exam.slots || 'Not Set'}</span>
                    </div>
                    {exam.startTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>{exam.startTime} - {exam.endTime}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => alert(`View candidates for ${exam.title}`)}
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium transition border border-gray-200"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Candidates
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