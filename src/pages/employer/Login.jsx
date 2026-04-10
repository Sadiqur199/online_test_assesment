import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validCredentials = {
    email: 'admin@gmail.com',
    password: 'admin123'
  };

const handleLogin = (e) => {
  e.preventDefault();

  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  if (
    cleanEmail === validCredentials.email &&
    cleanPassword === validCredentials.password
  ) {
    localStorage.setItem('employerAuth', 'true');
    localStorage.setItem('userRole', 'employer');
    navigate('/employer/dashboard');
  } else {
    setError('Invalid email or password');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">

        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition"
        >
          ← Back
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">AKJ RESOURCE</h1>
          <p className="text-gray-500 mt-2">Employer Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="admin@akj.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
          >
            Sign In
          </button>

          <p className="text-xs text-gray-400 text-center mt-2">
            Demo: admin@gmail.com / admin123
          </p>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          Helpline +88 011020202505 | support@akj.work
        </div>
      </div>
    </div>
  );
}