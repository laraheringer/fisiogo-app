import { faAlignLeft, faCalendar, faHospitalUser, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';

interface Page {
  title: string;
  icon: IconDefinition,
  url: string
}
export default function HomePage() {  
  const pages: Page[] = [
    {title: 'Usuário', icon: faUser, url: '/users'},
    {title: 'Pacientes', icon: faHospitalUser, url: '/patients'},
    {title: 'Agendamentos', icon: faCalendar, url: '/schedule'},
    {title: 'Configuração do Prontuário', icon: faAlignLeft, url: '/form-config'}
]

  return (
    <div className='min-h-screen flex items-center justify-center'>    
      <div className='flex flex-wrap gap-6 justify-center'>
        {
          pages.map((page: Page, index: number) => {
            return (
              <Link key={index} to={page.url}>              
                <Card title={page.title} icon={page.icon}></Card>
              </Link>
            )
          })
        } 
      </div> 
    </div>
  )
}