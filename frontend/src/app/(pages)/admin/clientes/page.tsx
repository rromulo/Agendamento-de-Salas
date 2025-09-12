'use client'
import PermissionButton from '@/components/buttons/PermissionButton';
import SwitchStatus from '@/components/switch';
import { DataTable } from '@/components/table/DataTable';
import { IUserProps } from '@/interfaces/cliente.interface';
import {
  getAllUsers,
  setActivePermission,
  setSchedulingPermission,
  setViewLogsPermission,
} from '@/services/users';
import { randomUUID } from 'crypto';
import React, { useEffect, useState } from 'react'


const mocksCliente: IUserProps[] = [
  {
    id: 'u1-9ah3h2h8h23',
    name: 'João Pedro Alves',
    email: 'joaopedro@gmail.com',
    role: 'CLIENTE',
    isActive: true,
    canScheduling: true,
    canViewLogs: false,
    address: {
      id: 'addr-1',
      cep: '59.114-320',
      estado: 'Rio Grande do Norte',
      cidade: 'Mossoró',
      bairro: 'Alto de São Manoel',
      rua: 'Rua das Flores',
      numero: '120',
      complemento: 'Casa A',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u1-9ah3h2h8h23'
    }
  },
  {
    id: 'u2-28djw9w2k1',
    name: 'Maria Clara Souza',
    email: 'mariaclara@hotmail.com',
    role: 'CLIENTE',
    isActive: false,
    canScheduling: false,
    canViewLogs: true,
    address: {
      id: 'addr-2',
      cep: '59.220-110',
      estado: 'Rio Grande do Norte',
      cidade: 'Parnamirim',
      bairro: 'Centro',
      rua: 'Avenida Getúlio Vargas',
      numero: '45',
      complemento: 'Ap 203',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u2-28djw9w2k1'
    }
  },
  {
    id: 'u3-71n2n1n3n7',
    name: 'Carlos Eduardo Silva',
    email: 'cadu.silva@gmail.com',
    role: 'CLIENTE',
    isActive: true,
    canScheduling: false,
    canViewLogs: false,
    address: {
      id: 'addr-3',
      cep: '59.180-500',
      estado: 'Rio Grande do Norte',
      cidade: 'Macaíba',
      bairro: 'Cajazeiras',
      rua: 'Rua São Paulo',
      numero: '89',
      complemento: '',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u3-71n2n1n3n7'
    }
  },
  {
    id: 'u4-19nd812bd',
    name: 'Ana Beatriz Ferreira',
    email: 'ana.bia@yahoo.com',
    role: 'CLIENTE',
    isActive: true,
    canScheduling: true,
    canViewLogs: true,
    address: {
      id: 'addr-4',
      cep: '59.200-300',
      estado: 'Rio Grande do Norte',
      cidade: 'Caicó',
      bairro: 'Itans',
      rua: 'Travessa Bom Jesus',
      numero: '200',
      complemento: '',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u4-19nd812bd'
    }
  },
  {
    id: 'u5-19829jd92',
    name: 'Rafael Martins',
    email: 'rafa.martins@outlook.com',
    role: 'CLIENTE',
    isActive: false,
    canScheduling: true,
    canViewLogs: false,
    address: {
      id: 'addr-5',
      cep: '59.250-410',
      estado: 'Rio Grande do Norte',
      cidade: 'Ceará-Mirim',
      bairro: 'Planalto',
      rua: 'Rua do Comércio',
      numero: '12',
      complemento: 'Loja 1',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u5-19829jd92'
    }
  },
  {
    id: 'u6-2hdh82jd2',
    name: 'Fernanda Lima',
    email: 'fernandinha@gmail.com',
    role: 'CLIENTE',
    isActive: true,
    canScheduling: false,
    canViewLogs: false,
    address: {
      id: 'addr-6',
      cep: '59.330-120',
      estado: 'Rio Grande do Norte',
      cidade: 'Touros',
      bairro: 'Praia de Perobas',
      rua: 'Rua das Gaivotas',
      numero: '3',
      complemento: 'Casa de Praia',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u6-2hdh82jd2'
    }
  },
  {
    id: 'u7-92b82jd9',
    name: 'Lucas Henrique',
    email: 'lucash@gmail.com',
    role: 'CLIENTE',
    isActive: true,
    canScheduling: true,
    canViewLogs: false,
    address: {
      id: 'addr-7',
      cep: '59.110-800',
      estado: 'Rio Grande do Norte',
      cidade: 'Natal',
      bairro: 'Alecrim',
      rua: 'Rua Presidente Bandeira',
      numero: '400',
      complemento: 'Bloco B',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u7-92b82jd9'
    }
  },
  {
    id: 'u8-8172j1j29',
    name: 'Juliana Andrade',
    email: 'juandrade@gmail.com',
    role: 'CLIENTE',
    isActive: false,
    canScheduling: false,
    canViewLogs: true,
    address: {
      id: 'addr-8',
      cep: '59.140-210',
      estado: 'Rio Grande do Norte',
      cidade: 'São Gonçalo do Amarante',
      bairro: 'Regomoleiro',
      rua: 'Rua Santa Rita',
      numero: '15',
      complemento: '',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u8-8172j1j29'
    }
  },
  {
    id: 'u9-2918jd8',
    name: 'Diego Barbosa',
    email: 'diegobarbosa@hotmail.com',
    role: 'CLIENTE',
    isActive: true,
    canScheduling: false,
    canViewLogs: true,
    address: {
      id: 'addr-9',
      cep: '59.170-999',
      estado: 'Rio Grande do Norte',
      cidade: 'Extremoz',
      bairro: 'Redinha',
      rua: 'Rua Beira Rio',
      numero: '78',
      complemento: 'Ap 402',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u9-2918jd8'
    }
  },
  {
    id: 'u10-827jd8jd',
    name: 'Patrícia Gomes',
    email: 'patriciagomes@gmail.com',
    role: 'CLIENTE',
    isActive: true,
    canScheduling: true,
    canViewLogs: false,
    address: {
      id: 'addr-10',
      cep: '59.300-500',
      estado: 'Rio Grande do Norte',
      cidade: 'Currais Novos',
      bairro: 'Centro',
      rua: 'Rua Frei Miguelinho',
      numero: '9',
      complemento: '',
      createdAt: '2025-09-12T02:29:26.049Z',
      userId: 'u10-827jd8jd'
    }
  }
]



function ClientesAdmin() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUserProps[] | []>([])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const usersData = await getAllUsers()
      setUsers(usersData)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  

  const handlePermissionUser = async (userId: string, type: 'scheduling' | 'logs' | 'active', hasPermission: boolean) => {
    console.log('DADOS HANDLE PERMISSIONUSER -->', userId, type, hasPermission)
    if(type === 'scheduling'){
      const response = await setActivePermission(userId, {canScheduling: hasPermission});
      setUsers(response)
    }
    if(type === 'logs') {
      const response = await setViewLogsPermission(userId, {canViewLogs: hasPermission})
      setUsers(response)
    } 
    if(type === 'active') {
      const response = await setSchedulingPermission(userId, {isActive: hasPermission})
      setUsers(response)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className=''>
      <DataTable
        data={users}
        columns={[
          { key: "date", label: "Data de cadastro",
            render: (record: IUserProps) =>{
              const dateFormatted = new Date(record.address.createdAt).toLocaleDateString('pt-BR')
              const hourFormatted = new Date(record.address.createdAt).toLocaleTimeString('pt-BR')
              return (
              <div>
                <div className="font-normal text-sm">{dateFormatted} às {hourFormatted}</div>
              </div>
            )}
           },
          { key: "name", label: "Nome",
            render: (record: IUserProps) => (
              <div>
                <div className="font-medium">{record.name}</div>
                <div className="text-xs font-normal text-gray-500">{record.role}</div>
              </div>
            )
          },
          { key: "endereco", label: "Endereço",
            render: (record: IUserProps) => (
              <div>
                <div className="font-medium">{record.address.rua} nº{record.address.numero?? 'S/N'}, {record.address.bairro}, {record.address.cidade}, {record.address.estado}</div>
                {/* <div className="text-xs font-normal text-gray-500">{record.role}</div> */}
              </div>
            )
          },
          {
            key: "permicoes",
            label: "Permissões",
            render: (row) => {    
              return (
                <div className='flex gap-4'>
                  <PermissionButton classes={`${row.canScheduling ? 'bg-black text-white' : 'bg-white text-black border-1 border-black  '}`} text='Agendamentos' onSave={() => handlePermissionUser(row.id || '', 'scheduling', !row.canScheduling)} />
                  <PermissionButton classes={`${row.canViewLogs ? 'bg-black text-white' : 'bg-white text-black border-1 border-black  '}`} text='Logs' onSave={() => handlePermissionUser(row.id || '', 'logs', !row.canViewLogs)}/>
                </div>
              );
            },
          },
        ]}
        actions={(row) => (
          <div className="flex gap-2 justify-center">
            <SwitchStatus onSave={() => handlePermissionUser(row.id || '', 'active', !row.isActive)} setActiveStatus={row.isActive}/>
          </div>
        )}
      />
    </div>
  );
}

export default ClientesAdmin