import { Router, Request, Response, NextFunction } from 'express';
import { AddressRepository } from '@infra/repositories/address.repository';
import { AddressUseCase } from '@cases/address/address.use-case';
import { AddressController } from '@core/controllers/address.controller';
import { verifyToken } from 'src/middlewares/verifyToken';

const addressRouter = Router();

const addressRepository = new AddressRepository();
const addressUseCase = new AddressUseCase(addressRepository);
const addressController = new AddressController(addressUseCase);

addressRouter.post('/address', verifyToken,addressController.saveAddres.bind(addressController))
addressRouter.get('/address', verifyToken,addressController.getAddresViaCepApi.bind(addressController))

export default addressRouter;