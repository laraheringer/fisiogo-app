import React, { useEffect, useState } from 'react';
import { FormConstants } from '../../constants';
import { Field, useFieldService } from '../../services/FieldsService';
import { AxiosResponse } from 'axios';

interface ButtonInfo {
  title: string;
  type: string;
}

export default function FormConfigPage() {  
  const { getFields } = useFieldService();
  const [fields, setFields] = useState([]);

  const buttons: ButtonInfo[] = [
    {
      title: 'Adicionar Número',
      type: FormConstants.FIELD_TYPES.NUMBER
    },
    {
      title: 'Adicionar Texto',
      type: FormConstants.FIELD_TYPES.TEXT
    },
    {
      title: 'Adicionar Lista',
      type: FormConstants.FIELD_TYPES.LIST
    }
  ];

  function handleAddFieldClick(fieldType: string): void {
    console.log(fieldType)
  }

  useEffect(() => {
    getFields().then((response: AxiosResponse<Field[]>) => {
      setFields(response.data);
    }).catch(error => console.log(error))
  })

  return (
    <div className='h-screen flex flex-col items-center gap-3'>
      <section className='flex items-center justify-end gap-3 w-full p-3 h-14'>
        {
          buttons.map((button: ButtonInfo) => {
            return (
              <button key={button.type} onClick={() => handleAddFieldClick(button.type)} className='text-white bg-secondary h-8 px-2 rounded hover:shadow-[inset_0_0_0_20rem_#01172910]'>{button.title}</button>
            );
          })
        }
      </section>
      <main className='flex w-9/12 bg-slate-50 gap-3 rounded-2xl flex-col p-4'>
        <header className='text-center text-xl font-semibold'>Modelo de Formulário</header>
        <section>
          {
            fields.map((field: Field) => {
              return (
                <p key={field._id}>{field.label}</p>
              )
            })
          }
        </section>
      </main>
    </div>
  )
}