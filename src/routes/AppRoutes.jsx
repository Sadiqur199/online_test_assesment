import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import EmployerLogin from "../pages/employer/Login";
import EmployerDashboard from "../pages/employer/Dashboard";
import CreateTest from "../pages/employer/CreateTest";

import CandidateLogin from "../pages/candidate/Login";
import CandidateDashboard from "../pages/candidate/Dashboard";
import Exam from "../pages/candidate/Exam";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Default route */}
        <Route path="/" element={<Home />} />

        {/* Employer */}
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/create" element={<CreateTest />} />

        {/* Candidate */}
        <Route path="/candidate/login" element={<CandidateLogin />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/exam/:id" element={<Exam />} />

      </Routes>
    </BrowserRouter>
  );
}