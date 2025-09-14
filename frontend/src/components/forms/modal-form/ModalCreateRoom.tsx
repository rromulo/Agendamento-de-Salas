import React, { useState } from 'react'
import { Modal } from '.';
import { useModal } from '@/hooks/useModal';
import { mask } from 'remask';
import { saveRoom, getAllRooms } from '@/services/room';

interface AdjustmentModalProps {

  refreshRooms: () => void;
}

const ModalCreateRoom = ({refreshRooms}: AdjustmentModalProps) => {
  const { isOpen, open, close } = useModal();
  const [roomName, setRoomName] = useState<string>('')
  const [scheduleBlockRoom, setScheduleBlockRoom] = useState<string>('')
  const [openTime, setOpenTime] = useState<string>(``)
  const [closeTime, setCloseTime] = useState<string>(``)
  const pattern = ['99:99']

  const handleSaveRoom = async () => {
    await saveRoom({
      name: roomName,
      description: '',
      openTime,
      closeTime,
      scheduleBlock: [scheduleBlockRoom]
    })
    setTimeout(async () => {
      refreshRooms()
      close()
    }, 2000)
  }

  return (
    <>
      <button className="text-black font-bold cursor-pointer" onClick={open}>
        + Adicionar nova sala 
      </button>

      <Modal
      isOpen={isOpen}
      onClose={close}
      title="Nova Sala"
      size="sm"
      >
        <div className="space-y-6">
          {/* Nome da sala */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <strong>Nome da sala</strong> (Obrigarório)
            </label>
            <input
              type="text"
              defaultValue={roomName}
              onChange={(e) => {setRoomName(e.target.value)}}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder='Nome da sala'
            />
          </div>

          {/* Horário inicial & Final */}
          <div className="flex flex-wrap gap-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 outline-0">
              <strong>Horário inicial & final da sala</strong> (Obrigarório)
            </label>
            <div className='w-full gap-4 flex justiry-between'>
              <input
                type="text"
                value={mask(openTime, pattern)}
                onChange={(e) => {setOpenTime(e.target.value)}}
                className="w-3/4 p-3 border border-gray-300 rounded-md"
                placeholder='Horário Inicial'
              />
              <input
                type="text"
                value={mask(closeTime, pattern)}
                onChange={(e) => {setCloseTime(e.target.value)}}
                className="w-3/4 p-3 border border-gray-300 rounded-md"
                placeholder='Horário Final'
              />
            </div>
          </div>

          {/* Bloco de Horários */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <strong>Bloco de Horários de agendamento</strong> (Obrigarório)
            </label>
            <input
                type="text"
                value={scheduleBlockRoom}
                onChange={(e) => {setScheduleBlockRoom(e.target.value)}}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder='Bloco de horários'
              />
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col items-start pt-4 border-t border-gray-300">
            <div className="space-x-3 w-full mt-5 h-[44px]">
              <button
                onClick={() => {
                  handleSaveRoom()
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
  )
}

export default ModalCreateRoom