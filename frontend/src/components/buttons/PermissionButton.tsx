import React from 'react'

interface PermissionButtonProps {
  onSave: () => void;
  text: string;
  classes?: string
}

export const PermissionButton =  ({
  onSave,
  text,
  classes
}: PermissionButtonProps) => {
  return (
    <button className={`${classes}  h-[44px] px-5 rounded-4xl cursor-pointer`} onClick={onSave}>{text}</button>
  )
}

export default PermissionButton