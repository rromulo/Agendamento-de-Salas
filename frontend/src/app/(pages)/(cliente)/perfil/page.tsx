'use client'
import RegisterForm from '@/components/forms/RegisterForm'
import { useAuth } from '@/app/context/authContext'
import React, { useEffect, useState } from 'react'
import { getUserById } from '@/services/users'
import { IUserProps } from '@/interfaces/cliente.interface'
import { updateUser } from '@/services/users'

const MinhaConta = () => {
  const [userDataProps, setUserDataProps] = useState<IUserProps | null>(null)
  const { authState: { user, loading }, userData } = useAuth()
  

  const getUser = async () => {
    if (user) {
      const response = await getUserById(user.id)
      setUserDataProps(response)
    }
  }

  // Função para converter IUserProps para o formato do initialData
  const convertUserToFormData = (user: IUserProps | null) => {
    if (!user) return undefined;
    
    // Divide o nome completo em primeiro e último nome
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return {
      firstName,
      lastName,
      email: user.email,
      cep: user.address?.cep || '',
      number: user.address?.numero || '',
      complement: user.address?.complemento || '',
      address: user.address
    };
  };

  useEffect(() => {
    getUser()
    userData()
  }, [])

  useEffect(() => {
    getUser()
  }, [user])

  const handleSubmit = async (userId: string, userData: Partial<IUserProps>) => {
    await updateUser(user?.id || '', userData)
  }

  if(!userDataProps) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <RegisterForm 
        isProfile
        onSubmit={handleSubmit}
        initialData={convertUserToFormData(userDataProps)} 
      />
    </div>
  )
}

export default MinhaConta