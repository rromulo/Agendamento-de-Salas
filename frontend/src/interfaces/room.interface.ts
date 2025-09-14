export interface IRoomInterface {
  id: string;
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  scheduleBlock: string[];
  // selectedSchedule: string;
}

export interface IRoomUpdate {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
}

export interface ICreateRoom {
  name: string;
  description: string;
  openTime: string;
  closeTime: string;
  scheduleBlock: string[];
  // selectedSchedule: string;
}