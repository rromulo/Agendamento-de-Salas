export interface IAddress {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
}

export interface IUserProps {
  id?: string | null;
  name: string;
  email: string;
  password: string;
  role: TuserRole;
  address: IAddress;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TuserRole = "admin" | "customer";

export class User {
  constructor(private user: IUserProps) {}

  isAdmin(): boolean {
    return this.user.role === "admin";
  }

  canEditProfile(): boolean {
    return true;
  }

  validate(): void {
    if (!this.user.email || !this.user.password || !this.user.name) {
      throw new Error("Missing required fields");
    }

    if(!this.user.email.includes("@")) {
      throw new Error('Invalid email format');
    }

    if(this.user.password.length < 8 ) {
      throw new Error('Password must be at least 8 characters long')
    }
  }

  fromEntity(): IUserProps {
    return {
      ...this.user,
      password: undefined,
    }
  }
}