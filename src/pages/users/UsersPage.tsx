import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InputText from '../../components/InputText';
import { UserConstants } from '../../constants';
import { User, useUserService } from '../../services/UsersService';

export default function UsersPage() {
  const {getUsers, createUser, updateUser, deleteUser} = useUserService()
  const [users, setUsers] = useState<Array<User>>([]);
  const [hoverLine, setHoverLine] = useState<string>(null);

  useEffect(() => {
    getUsers().then((userData: AxiosResponse<User[]>) => {
      setUsers(userData.data);
    }).catch(error => {console.log(error)});
  }, [])

  function handleEditUsername(username: string, user: User): void {
    editUser({...user, username})
  }

  function handleEditName(name: string, user: User): void {
    editUser({...user, name})
  }

  async function handleDeleteUser(userId: string): Promise<void> {
    try {
      await deleteUser(userId)
      const newUsers = users.filter((user: User) => user._id != userId);
      setUsers(newUsers);
    } catch (error) {
      console.log(error)
    }
  }

  async function editUser(user: User): Promise<void> {
    try {
      const { data } = await updateUser(user);
    
      const editedUserIndex = users.findIndex((user: User) => user._id == data._id);
      const editedUsers = [...users];
      editedUsers.splice(editedUserIndex, 1, data);
      setUsers(editedUsers)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='p-8'>
      <header className='flex items-center justify-between'>
        <section className='flex gap-4 items-center'>
          <Link to="/home" title='Voltar'><FontAwesomeIcon className='text-white text-2xl font-bold' icon={faArrowLeft}/></Link>
          <h1 className='text-white text-2xl font-bold'>Usuários</h1>
        </section>
        <button className='text-white bg-secondary h-8 px-2 rounded hover:shadow-[inset_0_0_0_20rem_#01172910]'>Novo Usuário</button>
      </header>
      <table className='w-full bg-gray-200 mt-4 rounded-2xl'>
        <thead>
          <tr className='border-b border-gray-500 h-12 text-left'>
            <th className='px-3 py-0.5 w-1/3 text-gray-800'>Nome</th>
            <th className='px-3 py-0.5 w-1/3 text-gray-800'>Nome de usuário</th>
            <th className='px-3 py-0.5 w-1/3 text-gray-800'>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user: User) => {
              return (
                <tr key={user._id} onMouseOver={() => setHoverLine(user._id)} onMouseLeave={() => setHoverLine(null)}>
                  <td className='px-3 py-1 text-gray-800'><InputText text={user.name} onSave={(editedText: string) => handleEditName(editedText, user)}/></td>
                  <td className='px-3 py-1 text-gray-800'><InputText text={user.username} onSave={(editedText: string) => handleEditUsername(editedText, user)}/></td>
                  <td className='px-3 py-1 relative'>
                    <span className='text-gray-800'>{UserConstants.USER_TYPES_TRANSLATIONS[user.type?.toUpperCase()]}</span>
                    {
                      hoverLine == user._id ? (
                        <button onClick={() => handleDeleteUser(user._id)} className='absolute right-4 rounded-full hover:bg-gray-300 w-6 h-6'><FontAwesomeIcon icon={faTrash} className='text-gray-800 text-sm'></FontAwesomeIcon></button>
                      ) : false
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}