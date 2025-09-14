"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AdjustmentModal } from '../forms/modal-form/ModalAjustes';
import { IRoomInterface, IRoomUpdate } from '@/interfaces/room.interface';
import { getAllRooms, updateRoom } from '@/services/room';
import { ScheduleModal } from '../forms/modal-form/ModalSchedule';
import { useAuth } from '@/app/context/authContext';
import { saveBooking, getBookinsByUser } from '@/services/bookings';
import { ICreateBooking } from '@/interfaces/booking,interface';
import Input from '../input/Input';
import { SearchComponent } from '../input/SearchComponent';
import { usePathname } from 'next/navigation';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onFilter: (term: string, page: number, limit: number) => void;
  onDateFilter?: (date: string) => void;
  actions?: (item: T) => React.ReactNode;
  path?: string;
  role?: 'ADMIN' | 'CLIENTE',
  refreshData?: (page: string) => Promise<void>;
  page?: string
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onFilter,
  onDateFilter,
  actions,
  path,
  role,
  refreshData,
  page = '1',
  setValue,
  value
}: DataTableProps<T>) {
  const [dataRooms, setDataRooms] = useState<IRoomInterface[] | []>([])
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState("");
  const {authState: { user }} = useAuth()
  const pathname = usePathname()

  const getRooms = async () => {
    try {
      const response = await getAllRooms()
      if (response) {
        setDataRooms(response)
      }
    } catch (error) {
      return [];
    }
  }
  useEffect(() => {
    getRooms()
  }, [])

  const handleUpdateRoom = async (dataToUpdate: IRoomUpdate) =>{
    await updateRoom(dataToUpdate.id, dataToUpdate)
    getRooms();
  }

  const handleSaveBooking = async (dataSave: {roomId: string, startTime: string, endTime:string, status: string, date: string}) => {
    await saveBooking(
      {
        ...dataSave,
        userId: user?.id || ''
      } as unknown as ICreateBooking
    )
    if(refreshData) {
      await refreshData(page)
    }
  }

  const handleTextPlaceHolder = () => {
    if(!['/admin/logs', '/logs'].includes(pathname)) return 'Filtre por nome';
    if(pathname === '/logs') return 'Filtre por tipo de atividade ou Módulo';
    return 'Filtre por cliente, tipo de atividade ou Módulo'
  }
 
  return (
    <div className="p-8 bg-white border-1 border-gray-300 rounded-md">
      <div className="flex flex-wrap items-center gap-4 lg:gap-40 mb-4 lg:flex-nowrap justify-between">
        <div className='flex items-center gap-2 w-full lg:w-2/3'>
          {

          }
            <SearchComponent
              value={value}
              delay={500}
              setValue={setValue}
              onSearch={onFilter}
              page={+page}
              limit={20}
              placeHolder={handleTextPlaceHolder()}
              className='w-full outline-0'
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded-md border-gray-300"
            />
        </div>
        <div className='w-full lg:w-[288px]'>
          {
            (path === 'agendamentos' && role === 'ADMIN') && (

              <AdjustmentModal
                refreshRooms={getRooms}
                onSave={handleUpdateRoom}
                dataRoom={dataRooms}
              />
            )
          }
          {
            path === 'agendamentos' && role === "CLIENTE" && (
              <ScheduleModal
                roomName={''}
                initialTime={''}
                finalTime={''}
                timeBlock={''}
                onSave={handleSaveBooking}
                dataRoom={dataRooms}
                textMainButton={''} />              
            )
          }
        </div>
      </div>

      {/* Tabela */}
      <div className='overflow-auto max-h-[791px]'>
        <table className="w-full border-collapse rounded-md h-[700px] ">
          <thead>
            <tr className="border-t border-gray-300">
              {columns.map((col) => (
                <th key={col.key as string} className=" py-6 text-left h-[20px]">
                  {col.label}
                </th>
              ))}
              {actions && <th className=" p-2">Ação</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="p-4 text-center">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
            {data.map((row, idx) => {
              return (
              <tr key={idx} className={`${row.status === 'confirmado' ? 'bg-[#F2FFFD]' : row.status === 'recusado' ? 'bg-[#FFF3F3]' : ''}`}>
                {columns.map((col) => (
                  <td key={col.key as string} className={`border-t border-gray-300 py-6 h-[20px]`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && <td className="border-t border-gray-300 p-2">{actions(row)}</td>}
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
}
