import Link from 'next/link'
import React from 'react'

type switchButton = {
  text: string;
  link: string
}

const SwitchLoginRegisterButton = ({ text, link }: switchButton) => {
  return (
    <Link href={`/${link}`} className='bg-black flex items-center rounded-md text-white font-medium px-10 py-3'><p className='m-auto'>{text}</p></Link>
  )
}

export default SwitchLoginRegisterButton