export interface IAddressProps {
  id: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  userId: string;
}

export interface ICreateAddress {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  userId: string;
}

export class Address {
  constructor(private props: IAddressProps) {}

  getPublicAddress(): Partial<IAddressProps>{
    return {
      id: this.props.id,
      estado: this.props.estado,
      cidade: this.props.cidade,
      bairro: this.props.bairro,
      rua: this.props.rua,
      numero: this.props.numero,
      complemento: this.props.complemento,
      userId: this.props.userId
    }
  }
}