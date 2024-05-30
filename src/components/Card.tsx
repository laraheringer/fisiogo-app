import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface CardProps {
  title: string;
  icon: IconDefinition
}

export default function Card(props: CardProps) {
  return (
    <div className='h-44 w-52 rounded-3xl border border-gray-400 bg-gray-200 hover:shadow-gray-600 hover:shadow-sm cursor-pointer flex flex-col items-center justify-center gap-4'>
        <span className="font-bold text-xl text-gray-600 text-center">{props.title}</span>
        <FontAwesomeIcon className='h-6 text-gray-600' icon={props.icon} />
    </div>
  )
}