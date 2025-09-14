'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { mask, unmask } from 'remask';
import Input from '../input/Input';
import { saveUser } from '@/services/users';
import { IAddress, ICreateUser, IUserProps } from '@/interfaces/cliente.interface';
import { ICreateAddress, IUpdateAddress } from '@/interfaces/address.interface';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
  isProfile?: boolean;
  initialData?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    cep?: string;
    number?: string;
    complement?: string;
    address?: IAddress;
  };
  onSubmit?: (userId: string, userData: Partial<IUserProps>) => void;
}

export default function RegisterForm({ isProfile = false, initialData, onSubmit }: RegisterFormProps) {
  const [firstName, setFirstName] = useState<string>(initialData?.firstName || '')
  const [lastName, setLastName] = useState<string>(initialData?.lastName || '')
  const [email, setEmail] = useState<string>(initialData?.email || '')
  const [password, setPassword] = useState<string>('')
  const [number, setNumber] = useState<string>(initialData?.number || '')
  const [complement, setComplement] = useState<string>(initialData?.complement || '')
  const [cep, setCep] = useState(initialData?.cep || "");
  const [address, setAddress] = useState<IAddress | null>(initialData?.address || null);
  const [loading, setLoading] = useState(false);
  const pattern = ['99-999.999']
  const { login } = useAuth()
  console.log('INITIAL DATA NO FORM --->', initialData)

  const handleInput = (setState: Dispatch<SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  async function handleCepBlur() {
    if (!cep) return;
    setLoading(true);
    try {
      const umaskCep = unmask(cep)
      const res = await fetch(`https://viacep.com.br/ws/${umaskCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setAddress(prev => ({
          ...prev,
          cep,
          estado: data.uf,
          cidade: data.localidade,
          bairro: data.bairro,
          rua: data.logradouro,
          numero: prev?.numero || '',
          complemento: prev?.complemento || ''
        }));
      } else {
        alert("CEP não encontrado");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar o CEP");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      password,
      address: {
        cep: unmask(cep),
        estado: address?.estado || '',
        cidade: address?.cidade || '',
        bairro: address?.bairro || '',
        rua: address?.rua || '',
        numero: number,
        complemento: complement
      }
    }

    if (isProfile && onSubmit) {
      onSubmit(initialData?.id || '', userData);
    } else {
      await saveUser(userData as ICreateUser, login);
    }
  }

  useEffect(() => {
    if (cep.length >= 10) {
      handleCepBlur();
    }
  }, [cep]);


  return (
    <div className={`flex items-center justify-center ${isProfile ? '' : 'min-h-screen'}`}>
      <div className={`bg-white rounded-lg w-full'}`}>
        <h1 className="text-xl font-semibold text-center mb-6">
          {isProfile ? '' : 'Cadastre-se'}
        </h1>

        <form className="flex flex-col gap-4 w-ful max-w-[448px] m-auto border border-gray-300 rounded-md p-4" onSubmit={handleSubmit}>
          <div className="flex gap-2 w-full">
            <Input
              type={'text'}
              placeHolder={'Nome'}
              onChange={handleInput(setFirstName)}
              value={firstName}
              required
              label={<span><strong>Nome</strong> (Obrigatório)</span>}
            />
            <Input
              type={'text'}
              placeHolder={'Sobrenome'}
              onChange={handleInput(setLastName)}
              value={lastName}
              required
              label={<span><strong>Sobrenome</strong> (Obrigatório)</span>}
            />
          </div>

          <Input
            type={'email'}
            placeHolder={'E-mail'}
            onChange={handleInput(setEmail)}
            value={email}
            required
            disabled={isProfile}
            label={<span><strong>E-mail</strong> (Obrigatório)</span>}
          />

          {/* {!isProfile && ( */}
            <Input
              type={'password'}
              placeHolder={'Senha'}
              onChange={handleInput(setPassword)}
              value={password}
              required
              label={<span><strong>Senha de acesso</strong> (Obrigatório)</span>}
            />
          {/* )} */}

          <Input
            type={'text'}
            placeHolder={'CEP'}
            onChange={handleInput(setCep)}
            value={mask(cep, pattern)}
            required
            label={<span><strong>CEP</strong> (Obrigatório)</span>}
          />

          {loading && <p className="text-sm text-gray-500">Buscando CEP...</p>}

          {address && (
            <>
              <Input
                type="text"
                value={address.rua}
                readOnly
                label="Rua"
                placeHolder={'Rua'}              
              />
              <Input
                type="text"
                placeHolder="Número"
                onChange={handleInput(setNumber)}
                value={number}
                label="Número"
              />
              <Input
                type="text"
                placeHolder="Complemento"
                onChange={handleInput(setComplement)}
                value={complement}
                label="Complemento"
              />
              <Input
                type="text"
                value={address.bairro}
                readOnly
                label="Bairro"
                placeHolder={'Bairro'}              
              />
              <Input
                placeHolder='Cidade'
                type="text"
                value={address.cidade}
                readOnly
                label="Cidade"
              />
              <Input
                type="text"
                value={address.estado}
                readOnly
                label="Estado"
                placeHolder={'Estado'}
              />
            </>
          )}

          <button
            type="submit"
            className="bg-black text-white rounded p-2 hover:bg-gray-800"
          >
            {isProfile ? 'Salvar Alterações' : 'Cadastrar-se'}
          </button>
        </form>
      </div>
    </div>
  );
}