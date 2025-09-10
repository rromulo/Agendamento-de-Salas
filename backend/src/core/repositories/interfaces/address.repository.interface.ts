import { ICreateAddress } from '@core/entities/address.entity';

export interface IAddressRepository {
  saveAddres(address: ICreateAddress): Promise<void>;
  updateAddress(id: string): Promise<void>;
  getAddressViaCepApi(cep:string): Record<string, any>
}
