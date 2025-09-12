export type TuserRole = "ADMIN" | "CLIENTE";
export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: TuserRole;
  isActive: boolean;
  canScheduling: boolean;
  canViewLogs: boolean;
}
export interface IUserProps {
  id?: string | null;
  name: string;
  email: string;
  role: TuserRole;
  isActive: boolean;
  canScheduling: boolean;
  canViewLogs: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  address: IAddress;
}

export interface IAddress {
  id: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
  userId: string;
  createdAt: string
}