'use client'
import { Pagination } from '@/components/paginate';
import { DataTable } from '@/components/table/DataTable';
import { IBooking } from '@/interfaces/booking,interface';
import { getAllBookings, getBookinsByUser, updateBooking } from '@/services/bookings';
import { useEffect, useState } from 'react';

export default function AdminAgendamentos() {

  const [bookings, setBookings] = useState<IBooking[] | []>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState("1")
  const [totalPages, setTotalPages] = useState<number>(1)

  const loadBookings = async (page: string) => {
    try {
      setLoading(true)
      const bookingsData = await getBookinsByUser(+page, 20)
      setBookings(bookingsData.logs)
      setTotalPages(bookingsData.totalPages)
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings(page)
  }, [])
  useEffect(() => {
    loadBookings(page)
  }, [page])

  const handleStatusBooking = async (userId: string, bookingId: string, status: 'recusado') => {
    setLoading(true)
    const response = await updateBooking(userId, bookingId, status)
    console.log('RESPONSE HANDLESTATUS ->', response)
    await loadBookings(page)
  }

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
        refreshData={loadBookings}
        page={page}
        path='agendamentos'
        role='CLIENTE'
        data={bookings}
        columns={[
          { key: "date", label: "Data agendamento",
            render: (record: IBooking) =>{
              const dateFormatted = new Date(record.date).toLocaleDateString('pt-BR')
              const horaFormatada = record.startTime.substring(0, 5);
              return (
              <div>
                <div className="font-normal text-sm">{dateFormatted} às {horaFormatada}</div>
              </div>
            )}
           },
          { key: "name", label: "Nome",
            render: (record: IBooking) => (
              <div>
                <div className="font-medium">{record.user.name}</div>
                <div className="text-xs font-normal text-gray-500">{record.user.role}</div>
              </div>
            )
          },
          { key: "sala", label: "Sala de agendamento",
            render: (row: IBooking) => {
              const sala = row.room.name
              return <span className={`p-2 text-white rounded-full text-lg font-medium bg-black rounded-lg"}`}>
              {sala.split(' ')[0]}
              {` `}
              <strong>{sala.split(' ')[1]}</strong>
            </span>
            }
          },
          {
            key: "status",
            label: "Status transação",
            render: (row) => {
              const status = row.status;
      
              const colors: Record<string, string> = {
                "confirmado": "bg-green-100 text-green-600 border-1 border-green-700 h-[27px]",
                "recusado": "text-red-600 border-1 border-red-700 h-[27px]",
                "pendente": "p-2text-gray-600 border-1 border-gray-700 h-[27px]",
              };
      
              return (
                <span className={`px-5 py-2 rounded-full text-lg font-medium ${colors[status] ?? "bg-gray-200 text-gray-700"}`}>
                  {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
                </span>
              );
            },
          },
        ]}
        actions={(row) => (
          <div className="flex gap-2 justify-center">
            {
              row.status !== 'recusado' && (<>

                <button onClick={() => {handleStatusBooking(row.user.id, row.id, 'recusado')}} className="text-white bg-black rounded-full h-[30px] w-[30px]">X</button>
              </>)
            }
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
