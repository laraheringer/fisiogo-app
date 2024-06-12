import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersPage from './UsersPage';
import { UserConstants } from '../../constants';
import { User, useUserService } from '../../services/UsersService';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../services/UsersService');

const mockGetUsers = jest.fn();
const mockCreateUser = jest.fn();
const mockUpdateUser = jest.fn();
const mockDeleteUser = jest.fn();

const usersMock: User[] = [
  {
    _id: '1',
    name: 'John Doe',
    username: 'john',
    type: UserConstants.USER_TYPES.ADMIN,
  },
  {
    _id: '2',
    name: 'Jane Smith',
    username: 'jane',
    type: UserConstants.USER_TYPES.PHYSIOTHERAPIST,
  },
];

describe('UsersPage Component', () => {
  beforeEach(() => {

    (useUserService as jest.Mock).mockReturnValue({
        getUsers: mockGetUsers,
        createUser: mockCreateUser,
        updateUser: mockUpdateUser,
        deleteUser: mockDeleteUser,
    });

    mockGetUsers.mockResolvedValue({ data: usersMock });
    mockCreateUser.mockResolvedValue({ data: { ...usersMock[0], _id: '3' } });
    mockUpdateUser.mockResolvedValue({ data: usersMock[0] });
    mockDeleteUser.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the users page correctly', async () => {
    render(<BrowserRouter><UsersPage /></BrowserRouter>);
    
    await waitFor(() => {
      expect(mockGetUsers).toHaveBeenCalled();
      expect(screen.getByText('Usuários')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

//   test('should add a new user', async () => {
//     render(<BrowserRouter><UsersPage /></BrowserRouter>);

//     fireEvent.click(screen.getByText('Novo Usuário'));

//     fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'New User' } });
//     fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'newuser' } });

//     fireEvent.click(screen.getByText('OK'));

//     await waitFor(() => {
//       expect(mockCreateUser).toHaveBeenCalled();
//       expect(screen.getByText('New User')).toBeInTheDocument();
//       expect(screen.getByText('newuser')).toBeInTheDocument();
//     });
//   });

//   test('should edit an existing user', async () => {
//     render(<BrowserRouter><UsersPage /></BrowserRouter>);

//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//     });

//     fireEvent.click(screen.getByText('John Doe'));

//     const input = screen.getByDisplayValue('John Doe');
//     fireEvent.change(input, { target: { value: 'John Updated' } });
//     fireEvent.blur(input);

//     await waitFor(() => {
//       expect(mockUpdateUser).toHaveBeenCalled();
//       expect(screen.getByText('John Updated')).toBeInTheDocument();
//     });
//   });

//   test('should delete a user', async () => {
//     render(<BrowserRouter><UsersPage /></BrowserRouter>);

//     await waitFor(() => {
//       expect(screen.getByText('John Doe')).toBeInTheDocument();
//     });

//     fireEvent.mouseOver(screen.getByText('John Doe'));
//     fireEvent.click(screen.getByRole('button', { name: /trash/i }));

//     await waitFor(() => {
//       expect(mockDeleteUser).toHaveBeenCalledWith('1');
//       expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
//     });
//   });
});
