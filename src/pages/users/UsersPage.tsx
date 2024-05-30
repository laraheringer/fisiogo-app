import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { User, useUserService } from '../../services/UsersService';

export default function UsersPage() {
  const {getUsers, createUser, updateUser, deleteUser} = useUserService()
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    getUsers().then((userData: AxiosResponse<User[]>) => {
      setUsers(userData.data);
    }).catch(error => {console.log(error)});
  }, [])

  return (
    <div className='p-8'>
      <p className='text-xl'>Lista de Usuários</p>
      <table className='w-full bg-gray-200 mt-4 rounded-2xl'>
        <thead>
          <tr className='border-b border-gray-500 h-12 text-left'>
            <th className='px-3 py-0.5'>Nome</th>
            <th className='px-3 py-0.5'>Nome de usuário</th>
            <th className='px-3 py-0.5'>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user: User) => {
              return (
                <tr key={user._id}>
                  <td className='px-3 py-1'>{user.name}</td>
                  <td className='px-3 py-1'>{user.username}</td>
                  <td className='px-3 py-1'>{user.type}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <ul>
        {

        }
      </ul>
    </div>
  )
}