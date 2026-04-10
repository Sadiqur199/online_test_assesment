import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSelectModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleRoleSelect = (role) => {
    if (role === 'candidate') {
      navigate('/candidate/login');
    } else {
      navigate('/employer/login');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Select Login Type
        </h2>

        <button
          onClick={() => handleRoleSelect('candidate')}
          className="w-full mb-3 p-3 border rounded hover:bg-indigo-50"
        >
          Candidate Login
        </button>

        <button
          onClick={() => handleRoleSelect('employer')}
          className="w-full p-3 border rounded hover:bg-purple-50"
        >
          Employer Login
        </button>

        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}