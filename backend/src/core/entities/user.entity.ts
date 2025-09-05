export interface IAddress {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
}

export type TuserRole = "admin" | "customer";

export class User {
  public id: number | null;
  public name: string;
  public email: string;
  public password: string;
  public role: TuserRole;
  public address: IAddress;
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  constructor (
    id: number | null,
    name: string,
    email: string,
    password: string,
    role: TuserRole = 'customer',
    address: IAddress
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.address = address;
  }

  isAdmin(): boolean {
    return this.role === "admin";
  }

  canEditProfile(): boolean {
    return true;
  }

  validate(): void {
    if (!this.email || !this.password || !this.name) {
      throw new Error("Missing required fields");
    }

    if(!this.email.includes("@")) {
      throw new Error('Invalid email format');
    }

    if(this.password.length < 8 ) {
      throw new Error('Password must be at least 8 characters long')
    }
  }
}