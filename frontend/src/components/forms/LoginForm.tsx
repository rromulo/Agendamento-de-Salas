'use client'
import Image from 'next/image';
import { useEffect, useState } from "react";
import Logo from '../../../public/assets/Logov1.png'
import { useAuth } from '@/hooks/useAuth';

interface LoginFormProps {
  title: string;
  subtitle?: string;
  showRegisterLink?: boolean;
  onSubmit: (data: { email: string; password?: string }) => void;
  role?: 'ADMIN' | 'CLIENTE';
  showLogo?: boolean;
}

export default function LoginForm({
  title,
  subtitle,
  showRegisterLink = false,
  role = 'CLIENTE',
  onSubmit,
  showLogo = false
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState<boolean>(false)

  const { login } = useAuth()

  const verifyEmail = (email: string): void => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const result = regex.test(email)
    setValidEmail(result)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    verifyEmail(email)
  }, [email])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      
      {
        showLogo ? (
          <Image src={Logo} alt='Logo agendamentos'/>
        ) : (<></>)
      }
      
      <h1 className="mb-6 text-4xl font-semibold my-[30px]">{title}</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[448px] space-y-4 rounded-md bg-white p-6 shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <strong>E-mail</strong> {role === 'ADMIN' ? "(Obrigatório)" : ""}
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border-1 border-[#D7D7D7] px-3 py-2 focus:border-black focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={`${role === 'ADMIN' || validEmail ? 'block' : 'hidden'}`}>
          <label className="block text-sm font-medium text-gray-700">
            <strong>Senha de acesso</strong> (Obrigatório)
          </label>
          <input
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-md border-1 border-[#D7D7D7] px-3 py-2 focus:border-black focus:ring-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-4 text-white hover:bg-gray-800"
        >
          Acessar conta
        </button>

        {showRegisterLink && (
          <div className='flex justify-around'>
            <p className="text-start text-md text-gray-600">
              Ainda não tem um cadastro?{" "}
            </p>
            <a href="/cadastro" className="font-bold text-md text-black hover:underline">
              Cadastre-se
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
