import { NextFunction, Request, Response } from 'express';
import { AddressUseCase } from '../../use-cases/address/address.use-case';

export class AddressController {
  constructor(private readonly addresshUseCase: AddressUseCase) {}

  async saveAddres(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {status, message} = await this.addresshUseCase.saveAddres(req.body)
    res.status(status).json(message)
  }

  async getAddresViaCepApi(req: Request, res: Response, next: NextFunction) {
      const { cep } = req.body
      const { status, message } = await this.addresshUseCase.getAddressViaCepApi(cep);
      res.status(status).json(message)
  }
}