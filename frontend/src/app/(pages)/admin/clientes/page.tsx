'use client'
import PermissionButton from '@/components/buttons/PermissionButton';
import { Pagination } from '@/components/paginate';
import SwitchStatus from '@/components/switch';
import { DataTable } from '@/components/table/DataTable';
import { IUserProps } from '@/interfaces/cliente.interface';
import {
  getAllUsers,
  getUsersByName,
  setActivePermission,
  setSchedulingPermission,
  setViewLogsPermission,
} from '@/services/users';
import { randomUUID } from 'crypto';
import React, { useEffect, useState } from 'react'


function ClientesAdmin() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUserProps[] | []>([])
  const [page, setPage] = useState("1")
  const [totalPages, setTotalPages] = useState<number>(1)
  const [name, setName] = useState<string>('')

  const loadUsers = async (page: string) => {
    try {
      setLoading(true)
      const usersData = await getUsersByName(+page, 20, name);
      setUsers(usersData.logs)
      setTotalPages(usersData.totalPages)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers(page)
  }, [page])

  const handlePermissionUser = async (userId: string, type: 'scheduling' | 'logs' | 'active', hasPermission: boolean) => {
    console.log('DADOS HANDLE PERMISSIONUSER -->', userId, type, hasPermission)
    if(type === 'scheduling'){
      const response = await setActivePermission(userId, {canScheduling: hasPermission}, +page);
      setUsers(response?.logs)
    }
    if(type === 'logs') {
      const response = await setViewLogsPermission(userId, {canViewLogs: hasPermission}, +page)
      setUsers(response?.logs)
    } 
    if(type === 'active') {
      const response = await setSchedulingPermission(userId, {isActive: hasPermission}, +page)
      setUsers(response?.logs)
    }
  }

  const handleSearchUsers = async (name: string, page: number, limit: number = 20) => {
    await getUsersByName(page, limit, name);
    setName(name)
    loadUsers("1")
  }

  useEffect(() => {
    loadUsers(page)
  }, [])

  useEffect(() => {
    loadUsers(page)
  }, [page])

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
        setValue={setName}
        value={name}
        onFilter={handleSearchUsers}
        data={users}
        columns={[
          { key: "date", label: "Data de cadastro",
            render: (record: IUserProps) =>{
              const dateFormatted = new Date(record.address.createdAt || '').toLocaleDateString('pt-BR')
              const hourFormatted = new Date(record.address.createdAt || '').toLocaleTimeString('pt-BR')
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
      <Pagination
        pagination={{ currentPage: Number(page), totalPages }}
        handleOnClick={setPage}
      />
    </div>
  );
}

export default ClientesAdmin