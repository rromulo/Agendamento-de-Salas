// components/AdjustmentModal.tsx
'use client';

import { IRoomInterface } from '@/interfaces/room.interface';
import { Modal } from '.';
import { useModal } from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import { mask } from 'remask';
import { generateTimeSlots } from '@/utils/generateTimeSlots';
import ButtonOpenModal from '@/components/buttons/ButtonOpenModal';

interface ScheduleModalProps {
  roomName: string;
  initialTime: string;
  finalTime: string;
  timeBlock: string;
  onSave: (data: {roomId: string, startTime: string, endTime:string, status: string, date: string}) => Promise<void>;
  dataRoom: IRoomInterface[];
  textMainButton: string
}

export function ScheduleModal({ 
  roomName, 
  initialTime, 
  finalTime, 
  timeBlock,
  dataRoom,
  onSave 
}: ScheduleModalProps) {
  const { isOpen, open, close } = useModal();
  const [room, setRoom] = useState<IRoomInterface | null>(dataRoom[0])
  const [scheduleBlockRoom, setScheduleBlockRoom] = useState<string[]>([])
  const [defineScheduleBlock, setDefineScheduleBlock] = useState<string[] | []>([])
  const [openCloseTime, setOpenCloseTime] = useState<string>(``)
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const pattern = ['99:99 - 99:99']

  const handleRoom = (id: string) => {
    const roomFiltered = dataRoom.find(roomf => roomf.id === id)
    if(roomFiltered) {
      setRoom(roomFiltered)
      const blockGenerate = generateTimeSlots(roomFiltered?.openTime || '', roomFiltered?.closeTime || '',  roomFiltered?.scheduleBlock[0] || '')
      setDefineScheduleBlock(blockGenerate)
      setOpenCloseTime(blockGenerate[0])
      console.log('ROOM FILTRADA ->', roomFiltered)
    } else console.log('Não ACHOU SALA')
  }

  useEffect(() => {
    handleRoom(dataRoom[0]?.id || '')
  }, [isOpen])
  
  return (
    <>
      <ButtonOpenModal onClick={open} text='Novo Agendamento' />

      <Modal
        isOpen={isOpen}
        onClose={close}
        title="Ajustes de agendamento"
        size="sm"
      >
        <div className="space-y-6">
          {/* Nome da sala */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecione uma <strong>data</strong> (obrigatório)
            </label>
            <div className={`flex justify-between w-full border-1 border-[#D7D7D7] h-[44px] rounded-md`}>
              <input
                className={`w-full p-3`}
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {/* <p>ICONE</p> */}
            </div>
          </div>

          {/* bloco de salas */}
          <div className="flex flex-wrap gap-4">
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-2 outline-0">
                Selecione um <strong>horário</strong> (Obrigatório)
              </label>
              <select
                defaultValue={room?.scheduleBlock[0]}
                onChange={(e) => {console.log(e.target.value);setOpenCloseTime(e.target.value)}}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                {
                  defineScheduleBlock.length > 0 && defineScheduleBlock?.map((scheduleTime: string, idx: number) => (
                    <option value={scheduleTime} key={idx}>{scheduleTime}</option>
                  ))
                }
              </select>
              
            </div>
          </div>

          {/* Bloco de salas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecionse uma <strong>sala</strong> (obrigatório)
            </label>
            <select
              defaultValue={dataRoom[0]?.id}
              className="w-full p-3 border border-gray-300 rounded-md"
              onChange={(e) => {handleRoom(e.target.value)}}
            >
              {
                dataRoom?.map((room: IRoomInterface) => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))
              }
            </select>
          </div>

          {/* Botões de ação */}
        </div>
        <div className="flex flex-col items-start mt-20 border-t border-gray-300">
          <div className="space-x-3 w-full mt-5 h-[44px]">
            <button
              onClick={async () => {
                await onSave({
                  roomId: room?.id || '',
                  date,
                  startTime: openCloseTime.split(' as ')[0],
                  endTime: openCloseTime.split(' as ')[1],
                  status: 'pendente'
                })
                // close();
              }}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full"
            >
              Confirmar Agendamento
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}