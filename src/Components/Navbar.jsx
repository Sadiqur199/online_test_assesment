import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSelectModal from './RoleSelectModal';

export default function Navbar() {
  const navigate = useNavigate();

  const [showRoleModal, setShowRoleModal] = useState(false);

  // Check login
  const isEmployerLoggedIn = localStorage.getItem('employerAuth') === 'true';
  const isCandidateLoggedIn = localStorage.getItem('candidateAuth') === 'true';
  const isLoggedIn = isEmployerLoggedIn || isCandidateLoggedIn;

  const userRole = localStorage.getItem('userRole');
  const userName =
    localStorage.getItem('candidateName') ||
    (userRole === 'employer' ? 'Employer' : '');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      navigate('/');
    }
  };

  const handleLoginClick = () => {
    setShowRoleModal(true);
  };

  return (
    <>
      <nav className="bg-white shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              <h1 className="font-bold text-lg">AKJ RESOURCE</h1>
            </div>

            {/* Right */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span>{userName || 'User'}</span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="px-5 py-2 bg-indigo-600 text-white rounded"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Modal */}
      <RoleSelectModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      />
    </>
  );
}