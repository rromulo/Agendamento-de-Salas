type TBookingStatus = 'pendente' | 'confirmado' | 'recusado';

export const getStatusUpdateBooking = (bookingStatus: TBookingStatus) => {
  const getStatus: Record<TBookingStatus, { action: string; description: string }> = {
    pendente: { action: 'Criação de agendamento', description: 'Agendamento' },
    confirmado: { action: 'Confirmação de agendamento', description: 'Agendamento' },
    recusado: { action: 'Cancelamento de agendamento', description: 'Agendamento' },
  };

  return getStatus[bookingStatus];
};
