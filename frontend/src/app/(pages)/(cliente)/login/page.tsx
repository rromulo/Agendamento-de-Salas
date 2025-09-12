'use client'
import LoginForm from '@/components/forms/LoginForm';
import React, { useState } from 'react'

function Login() {
  return (
    <div className="">
      <LoginForm
        title={'Entre na sua conta'}
        showRegisterLink
        onSubmit={() => {}}
        role={'CLIENTE'}
      />
    </div>
  )
}

export default Login