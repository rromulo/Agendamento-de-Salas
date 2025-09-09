import ApiError from '@utils/apiError';

export interface IAddress {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento?: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  role: TuserRole;
  isActive: boolean;
  isScheduling: boolean;
  isViewLogs: boolean;
}
export interface IUserProps {
  id?: string | null;
  name: string;
  email: string;
  password: string;
  role: TuserRole;
  isActive: boolean;
  canScheduling: boolean;
  canViewLogs: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TuserRole = "ADMIN" | "CLIENTE";

export class User {


  constructor(private props: IUserProps) {
    this.validate();
  };

  toPersistence(): Record<string, any> {
    return {
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      role: this.props.role,
      isActive: this.props.isActive,
      isScheduling: this.props.canScheduling,
      isViewLogs: this.props.canViewLogs
    }
  }

  isAdmin(): boolean {
    const verifyAdmin = this.props.role === "ADMIN"
    if(!verifyAdmin) throw new ApiError(404, 'Not Found');
    return true
  }

  canEditProfile(): boolean {
    return true;
  }

  validate(): void {
    const {name, email, password, role} = this.props
    if (!email || !password || !name) {
      throw new Error("Missing required fields");
    }

    if(!email.includes("@")) {
      throw new Error('Invalid email format');
    }

    if(password.length < 8 ) {
      throw new Error('Password must be at least 8 characters long')
    }

    if(!['ADMIN', 'CLIENTE'].includes(role)) throw new Error("Invalid role")
  }

  getPublicProfile(): Omit<IUserProps, "password"> {
    const { password, ...rest } = this.props;
    return rest
  }
}