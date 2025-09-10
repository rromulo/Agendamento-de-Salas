import { ICreateAddress } from '../../core/entities/address.entity';
import { IAddressRepository } from '../../core/repositories/interfaces/address.repository.interface';
import resp from '../../utils/resp';

export class AddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async saveAddres(address: ICreateAddress): Promise<{status: number, message: unknown}> {
    const response = await this.addressRepository.saveAddres(address)
    return resp(201, 'OK')
  }

  async getAddressViaCepApi(cep: string): Promise<{status: number, message: unknown}> {
    const data = await this.addressRepository.getAddressViaCepApi(cep);
    return resp(200, data)
  }
}