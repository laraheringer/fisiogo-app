import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useAuthService } from '../../services/AuthService';

export default function LoginPage() {
  const { login } = useAuthService();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('1234');

  const navigate = useNavigate();
  const { setToken } = useAuth();

  async function handleLogin() {
    try {
      const token = await login(username, password);
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  return (
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
  )
}
