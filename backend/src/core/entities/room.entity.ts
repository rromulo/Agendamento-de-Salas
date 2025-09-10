export interface ICreateRoom {
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  scheduleBlock: string[];
}

export interface IRoomProps {
  id:string;
  name: string;
  description?: string;
  openTime: string;
  closeTime: string;
  scheduleBlock: string[];
  createdAt?: Date;
  updatedAt?: Date
}

export class Room {
  
  constructor(private room: IRoomProps
   ) {}

  getPublicRoom(): Partial<IRoomProps> {
    return {
      id: this.room.id,
      name: this.room.name,
      description: this.room.description,
      openTime: this.room.openTime,
      closeTime: this.room.closeTime,
      scheduleBlock: this.room.scheduleBlock
    }
  }

  // validate(): void {
  //   if (!this.name || this.capacity <= 0) {
  //     throw new Error('Invalid room data');
  //   }
  // }

}