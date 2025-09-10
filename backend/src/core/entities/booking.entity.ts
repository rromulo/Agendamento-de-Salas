export type TBookingStatus = "pendente" | "confirmado" | "recusado";

export interface ICreateBooking {
  roomId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: TBookingStatus;
}

export interface IBookingProps {
  id: string;
  roomId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: TBookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Booking {

  constructor(private props: IBookingProps) {}

  getPublicBooking(): Partial<IBookingProps>{
    return {
      id: this.props.id,
      roomId: this.props.roomId,
      userId: this.props.userId,
      date: this.props.date,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      status: this.props.status,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt
    }
  }
}