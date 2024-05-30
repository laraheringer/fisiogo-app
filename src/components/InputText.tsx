
import { text } from '@fortawesome/fontawesome-svg-core';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

interface InputTextProps {
  text: string;
  initialStateEditing?: boolean;
  onSave?: (editedText: string) => void;
}

export default function InputText(props: InputTextProps) {
  const [isEditing, setIsEditing] = useState<boolean>(props.initialStateEditing);
  const [editedText, setEditedText] = useState<string>(props.text);

  function handleClick() {
    setEditedText(props.text)
    setIsEditing(true);
  };

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedText(e.target.value);
  };

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (props.onSave) props.onSave(editedText);
      setIsEditing(false);
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className='max-w-full'>
      {isEditing ? (
        <input
          className='h-6 rounded border-gray-300 border focus:border-gray-500 outline-none w-full'
          type="text"
          value={editedText}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)}
          onKeyDown={handleInputKeyDown}
          autoFocus
          size={editedText.length}
        />
      ) : (
        <span className='leading-7 overflow-hidden text-ellipsis block whitespace-nowrap' onClick={handleClick} title={props.text}>{props.text}</span>
      )}
    </div>
  )
}
