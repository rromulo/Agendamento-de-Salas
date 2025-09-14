'use client'
import { Pagination } from '@/components/paginate';
import { DataTable } from '@/components/table/DataTable';
import { ILogProps } from '@/interfaces/log.interface';
import { getAllLogs } from '@/services/logs';
import React, { useEffect, useState } from 'react'

function LogsAdmin() {
  const[logs, setLogs] = useState<ILogProps[] | []>([])
  const[loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState("1")
  const [totalPages, setTotalPages] = useState<number>(1)

  const loadLogs = async (page: string) => {
    try {
      setLoading(true)
      const logsData = await getAllLogs(+page, 20)
      setLogs(logsData.logs)
      setTotalPages(logsData.totalPages)
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadLogs(page)
  }, [])
  useEffect(() => {
    loadLogs(page)
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
        onFilter={() => {}}
        setValue={() => {}}
        value=''
        data={logs}
        columns={[
          { key: "cliente", label: "Cliente",
            render: (record: ILogProps) =>{
              
              return (
              <div>
                <div className="font-medium">{record.user.name}</div>
                <div className="text-xs font-normal text-gray-500">{record.user.role}</div>
              </div>
            )}
           },
          { key: "atividade", label: "Tipo de atividade",
            render: (record: ILogProps) => (
              <div>
                <div className="inline-block font-medium text-black border-1 rounded-4xl border-[#D7D7D7] py-2 px-4">{record.action}</div>
              </div>
            )
          },
          { key: "modulo", label: "Módulo",
            render: (record: ILogProps) => (
              <div>
                <div className="inline-block text-xs font-medium text-black border-1 rounded-4xl border-[#D7D7D7] py-2 px-4">{record.description}</div>
              </div>
            )
          },
          {
            key: "Date",
            label: "Data e horário",
            render: (record) => {    
              const dateFormatted = new Date(record.createdAt).toLocaleDateString('pt-BR')
              const hourFormatted = new Date(record.createdAt).toLocaleTimeString('pt-BR')
              return (
              <div className='border-1 rounded-4xl border-[#D7D7D7] w-[150px]'>
                <div className="font-medium text-sm text-center p-2">{dateFormatted} às {hourFormatted.slice(0, -3)}</div>
              </div>);
            },
          },
        ]}
        // actions={undefined}
      />
      <Pagination
        pagination={{ currentPage: Number(page), totalPages }}
        handleOnClick={setPage}
      />
    </div>
  );
}

export default LogsAdmin