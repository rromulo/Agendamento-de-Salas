import React, { Dispatch, SetStateAction } from 'react'

interface ButtonOpenModalProps {
  onClick: () => void;
  text?: string
}

export const ButtonOpenModal =  ({
  onClick,
  text
}: ButtonOpenModalProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer w-full"
    >
      {text}
    </button>
  )
}

export default ButtonOpenModal