'use client'
import LoginForm from '@/components/forms/LoginForm';
import React, { useState } from 'react'
import Logo from '../../../../../public/assets/Logov1.png'
import Image from 'next/image';
import Link from 'next/link';
import SwitchLoginRegisterButton from '@/components/buttons/SwitchLoginRegisterButton';

function Login() {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full">
      <div className='flex justify-between px-4  py-4 w-full h-[88px] border-b border-gray-300 lg:px-2'>
        <Image src={Logo} alt="logo agendamento de salas" />
        <SwitchLoginRegisterButton text='Cadastre-se' link='cadastro' />
      </div>
      <div className='w-full'>
        <LoginForm
          title={'Entre na sua conta'}
          showRegisterLink
          onSubmit={() => {}}
          role={'CLIENTE'}
        />
      </div>
    </div>
  )
}

export default Login