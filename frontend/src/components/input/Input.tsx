import React, { ChangeEventHandler, ReactNode } from 'react'

interface IInput {
  type: 'button' | 'text' | 'checkBox' | 'email' | 'password' | 'number' | 'submit';
  placeHolder: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string; 
  label: ReactNode;
  width?: string
  disabled?: boolean
  readOnly?: boolean
}

const Input = ({
  value,
  label,
  onChange,
  placeHolder,
  type,
  required = false,
  width = 'w-full',
  disabled = false,
  readOnly = false,
}: IInput) => {
  return (
    <div className='flex flex-row flex-wrap gap-2'>
      {label}
      <input
        type={type}
        placeholder={placeHolder}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        // onBlur={handleCepBlur}
        className={`border border-[#D7D7D7] ${readOnly === true ? 'bg-gray-100' : ''} rounded p-2 ${width} outline-0`}
      />
    </div>
  )
}

export default Input