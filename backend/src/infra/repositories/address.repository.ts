import { Address, IAddressProps, ICreateAddress } from '../../core/entities/address.entity';
import { IAddressRepository } from '../../core/repositories/interfaces/address.repository.interface';
import AddressModel from '../../infra/database/models/address.model';
import UserModel from '../../infra/database/models/user.model';
import ApiError from '../../utils/apiError';
import axios from 'axios';


export class AddressRepository implements IAddressRepository {
  async saveAddres(address: ICreateAddress): Promise<void> {
    const userExists = await UserModel.findByPk(address.userId)
    if (!userExists) throw new ApiError(404, 'Usuário não encontrado.');

    const response = await AddressModel.create({
      ...address,
      numero: 'S/N',
      complemento: ''
    })
  }
  updateAddress(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getAddressViaCepApi(cep: string): Promise<Record<string, any>> {
    try {
      const normalizeCep = cep.replace(/\D/g, '');
      const { data } = await axios.get(`https://viacep.com.br/ws/${normalizeCep}/json`);

      const addressProps: Partial<IAddressProps> = {
        cep: data.cep,
        estado: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        rua: data.logradouro,
      }

      return new Address(addressProps as IAddressProps).getPublicAddress();

    } catch (error: any) {
      throw new ApiError(500, `Error api cep: ${error.message}`)      
    }
  }

}