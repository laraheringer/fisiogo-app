import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { useAuthService } from '../../services/AuthService';

export default function LoginPage() {
  const { login } = useAuthService();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  async function handleLogin() {
    try {
      const response = await login(username, password);
      setToken(response.data);
      localStorage.setItem('token', response.data);
      navigate('/users');
    } catch (error) {
      setErrorMsg('Não foi possível logar. Verifique seu nome de usuário e sua senha')
    }
  }

  return (
    <div className='bg-black bg-opacity-30 min-h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-3 rounded-md bg-gray-100 p-5 w-96'>
          <input className='rounded p-1 border-gray-300 border focus:border-gray-500 outline-none' type='text' placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input className='rounded p-1 border-gray-300 border focus:border-gray-500 outline-none' type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button
            onClick={handleLogin}
            className="w-full p-2 text-white rounded bg-secondary font-semibold"
          >
            Entrar
          </button>
          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      </div>
    </div>

  )
}
