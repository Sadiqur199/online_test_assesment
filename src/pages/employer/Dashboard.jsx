// pages/employer/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamStore, PREDEFINED_TEST_IDS } from '../../store/useExamStore';
import { CalendarIcon, UserGroupIcon, DocumentDuplicateIcon, ClockIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const exams = useExamStore((state) => state.exams);
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('employerAuth');
    navigate('/employer/login');
  };

  const handleViewCandidates = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const getCandidateNames = (testIds) => {
    if (!testIds || testIds.length === 0) return [];
    return testIds.map(testId => {
      const candidate = PREDEFINED_TEST_IDS.find(c => c.id === testId);
      return {
        testId: testId,
        name: candidate ? candidate.name : 'Unknown Candidate'
      };
    });
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
                    <div className="flex items-center text-sm text-gray-600">
                      <UserGroupIcon className="w-5 h-5 mr-2 text-gray-400" />
                      <span>Authorized Test IDs: {exam.authorizedTestIds?.length || 0}</span>
                    </div>
                    {exam.startTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-5 h-5 mr-2 text-gray-400" />
                        <span>{new Date(exam.startTime).toLocaleDateString()} - {new Date(exam.endTime).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleViewCandidates(exam)}
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium transition border border-gray-200"
                  >
                    <EyeIcon className="w-4 h-4" />
                    View Authorized Candidates
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* View Candidates Modal */}
      {isModalOpen && selectedExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-5 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Authorized Candidates</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedExam.title}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              {selectedExam.authorizedTestIds && selectedExam.authorizedTestIds.length > 0 ? (
                <div className="space-y-3">
                  <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-indigo-800">
                      Total Authorized Candidates: <strong>{selectedExam.authorizedTestIds.length}</strong>
                    </p>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate Name</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getCandidateNames(selectedExam.authorizedTestIds).map((candidate, index) => (
                          <tr key={candidate.testId} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{candidate.testId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{candidate.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No candidates have been authorized for this exam yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Go to Create Test and select Test IDs to authorize candidates.</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end p-5 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t mt-12 py-6 text-center text-xs text-gray-400">
        Powered by AKJ RESOURCE | Helpline +88 011020202505 | support@akj.work
      </footer>
    </div>
  );
}