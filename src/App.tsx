import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormConfigPage from './pages/formConfig/FormConfigPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import PatientsPage from './pages/patients/PatientsPage';
import SchedulePage from './pages/schedule/SchedulePage';
import UsersPage from './pages/users/UsersPage';

export default function App() {
  return (
    <div className='bg-primary min-h-screen'>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/form-config" element={<FormConfigPage />} />
      </Routes>
    </Router>
    </div>

  );
};

