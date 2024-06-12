import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '../../services/AuthService';
import { useAuth } from '../../providers/AuthProvider';
import LoginPage from './LoginPage';

jest.mock('../../services/AuthService');
jest.mock('../../providers/AuthProvider');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('LoginPage', () => {
  const mockLogin = jest.fn();
  const mockSetToken = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuthService as jest.Mock).mockReturnValue({ login: mockLogin });
    (useAuth as jest.Mock).mockReturnValue({ token: null, setToken: mockSetToken });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
        <LoginPage />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the login form', () => {
    expect(screen.getByPlaceholderText('Usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('should display an error message on failed login', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Login failed'));
    const password: string = 'password';
    const user: string = 'user';

    fireEvent.change(screen.getByPlaceholderText('Usuário'), { target: { value: user } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: password } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(user, password)
      expect(screen.getByText('Não foi possível logar. Verifique seu nome de usuário e sua senha')).toBeInTheDocument();
    });
  });

  it('should call setToken and navigate on successful login', async () => {
    mockLogin.mockResolvedValueOnce({ data: 'mockToken' });

    fireEvent.change(screen.getByPlaceholderText('Usuário'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(mockSetToken).toHaveBeenCalledWith('mockToken');
      expect(localStorage.getItem('token')).toBe('mockToken');
      expect(mockNavigate).toHaveBeenCalledWith('/users');
    });
  });
});
