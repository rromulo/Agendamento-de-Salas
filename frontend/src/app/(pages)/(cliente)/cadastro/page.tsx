'use client'
import SwitchLoginRegisterButton from '@/components/buttons/SwitchLoginRegisterButton'
import RegisterForm from '@/components/forms/RegisterForm'
import React from 'react'
import Logo from '../../../../../public/assets/Logov1.png'
import Image from 'next/image'

const cadastro = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full">
      <div className='flex justify-between px-20 py-4 w-full h-[88px] border-b border-gray-300'>
        <Image src={Logo} alt="logo agendamento de salas" />
        <SwitchLoginRegisterButton text='Login' link='login' />
      </div>
      <div className='w-full'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default cadastro