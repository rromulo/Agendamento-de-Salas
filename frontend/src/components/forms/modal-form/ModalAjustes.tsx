// components/AdjustmentModal.tsx
'use client';

import { IRoomInterface } from '@/interfaces/room.interface';
import { Modal } from '.';
import { useModal } from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import { mask } from 'remask';

interface AdjustmentModalProps {
  roomName: string;
  initialTime: string;
  finalTime: string;
  timeBlock: string;
  onSave: (data: IRoomInterface) => void;
  dataRoom: IRoomInterface[];
}

export function AdjustmentModal({ 
  roomName, 
  initialTime, 
  finalTime, 
  timeBlock,
  dataRoom,
  onSave 
}: AdjustmentModalProps) {
  const { isOpen, open, close } = useModal();
  const [room, setRoom] = useState<IRoomInterface | null>(dataRoom[0])
  const [scheduleBlockRoom, setScheduleBlockRoom] = useState<string[]>([])
  const [defineScheduleBlock, setDefineScheduleBlock] = useState<string>(scheduleBlockRoom[0])
  const [openCloseTime, setOpenCloseTime] = useState<string>(`${room?.openTime} - ${room?.closeTime}`)

  const pattern = ['99:99 - 99:99']

  const handleRoom = (id: string) => {
    const roomFiltered = dataRoom.find(roomf => roomf.id === id)
    if(roomFiltered) {
      setRoom(roomFiltered)
      setScheduleBlockRoom(roomFiltered.scheduleBlock)
      setOpenCloseTime(`${room?.openTime.slice(0, -3)} - ${room?.closeTime.slice(0, -3)}`)
      console.log('ROOM FILTRADA ->', roomFiltered)
    } else console.log('Não ACHOU SALA')
  }

  useEffect(() => {
    if(dataRoom.length > 0){
      setRoom(dataRoom[0])
    }
    handleRoom(room?.id || '')
  }, [])

  return (
    <>
      <button
        onClick={open}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
      >
        Ajustes de agendamento
      </button>

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
              Nome da sala
            </label>
            <select
              defaultValue={room?.id}
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

          {/* Horário inicial & Final */}
          <div className="flex flex-wrap gap-4">
            <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-2 outline-0">
                Horário inicial & final da sala
              </label>
              <input
                type="text"
                value={mask(openCloseTime, pattern)}
                onChange={(e) => {setOpenCloseTime(e.target.value)}}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Bloco de Horários */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bloco de Horários de agendamento
            </label>
            <select
              defaultValue={room?.scheduleBlock[0]}
              onChange={(e) => {setDefineScheduleBlock(e.target.value)}}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              {
                scheduleBlockRoom?.map((scheduleTime: string, idx: number) => (
                  <option value={scheduleTime} key={idx}>{scheduleTime}</option>
                ))
              }
            </select>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col items-start pt-4 border-t border-gray-300">
            <button className="text-black font-bold">
              + Adicionar nova sala
            </button>
            <div className="space-x-3 w-full mt-5 h-[44px]">
              <button
                onClick={() => {
                  onSave({
                    id: room?.id || '',
                    name: room?.name || '',
                    description: room?.description || '',
                    scheduleBlock: room?.scheduleBlock || [],
                    openTime: openCloseTime.split(' - ')[0] || '',
                    closeTime: openCloseTime.split(' - ')[1] || '',
                    // selectedSchedule: defineScheduleBlock || ""
                  });
                  close();
                }}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}