export type TBookingStatus = "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELED";

export class Booking {
  public id: number | null;
  public roomId: number;
  public userId: number;
  public date: string;
  public startTime: string;
  public endTime: string;
  public status: TBookingStatus;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: number | null,
    roomId: number,
    userId: number,
    date: string,
    startTime: string,
    endTime: string,
    status: TBookingStatus = 'PENDING'
  ) {
    this.id = id;
    this.roomId = roomId;
    this.userId = userId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  canBeCancelled(): boolean {
    const now = new Date();
    const bookingDate = new Date(`${this.date}T${this.startTime}`);
    const hourDifference = (bookingDate.getTime() - now.getTime()) / (100 * 60 * 60);

    return hourDifference > 24 && this.status === "CONFIRMED";
  }

  validate() {
    if (!this.roomId || !this.userId || !this.date || !this.startTime || !this.endTime) {
      throw new Error('Missing required booking fields');
    }
    
    const bookingDateTime = new Date(`${this.date}T${this.startTime}`);
    if (bookingDateTime <= new Date()) {
      throw new Error('Cannot book in the past');
    }

    if (this.startTime >= this.endTime) {
      throw new Error('Start time must be before end time');
    }
  }

}