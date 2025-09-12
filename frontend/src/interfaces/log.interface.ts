import { IAddress } from './cliente.interface';

export interface ICreateLog {
  userId: string;
  action: string;
  description: string;
}
export interface ILogProps {
  id: string;
  action: string;
  description: string;
  userId: string;
  createdAt: Date;
  user: {
    id: string;
    name: string
    email: string;
    role: 'ADMIN' | 'CLIENTE';
    isActive: true,
    canScheduling: boolean,
    canViewLogs: boolean,
    address: IAddress
  }
}
