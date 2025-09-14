'use client'
import LoginForm from '@/components/forms/LoginForm';
import React, { useState } from 'react'

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="">
      <LoginForm
        title={'Login Admin'}
        onSubmit={() => {}}
        showLogo={true}
        role='ADMIN'
      />
    </div>
  )
}

export default LoginAdmin