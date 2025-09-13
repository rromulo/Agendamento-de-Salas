import { IUserProps, ICreateUser, IAddress } from '@/interfaces/cliente.interface';
import api from '@/app/api/axios';
import { toastError, toastSuccess } from '@/utils/toastify';
import { useAuth } from '@/hooks/useAuth';
import { ICreateAddress, IUpdateAddress } from '@/interfaces/address.interface';


//!! SERVICES DO USUÁRIO

export const getAllUsers = async (page: number, limit: number = 20, currentPage?: number): Promise<{logs: IUserProps[], page: number, totalPages: number}> => {
  console.log('ENTROU NO GET ALL USERS')  
  const response = await api.get(`/admin/users/${currentPage ?? page}/${limit}`)
    console.log('LOG DO GET ALL USER ---->',response.data)
    return response.data
}
export const saveUser = async (userData: ICreateUser, login: (credentials: { email: string; password: string }) => Promise<void>) => {
  try {
    const response = await api.post('/users', userData);
    console.log('Response save user', response.data)
    if (response.status === 201) {
      toastSuccess('Cadastro realizado com sucesso.')
      toastSuccess('Você será redirecionado dentro de 3 segundos')
      setTimeout(async () => {
        await login({email: userData.email, password: userData.password})
      }, 3000)
    }
  } catch (error: any) {
    if (error?.response?.data?.message) {
      toastError(error.response.data.message);
    } 
  }
}
export const getUserById = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`)
    return response.data.props;
  } catch (error) {
    toastError('Erro no response getUserById')
  }
}

export const updateUser = async (userId: string, dataUser: Partial<IUserProps>) => {
  try {
    const response = await api.patch(`/user/${userId}`, {dataUser, address: dataUser.address})
    if(response.status === 200) {
      toastSuccess('Informações salvas com sucesso.')
    }
  } catch (error: any) {
    if(error && error.response) {
      toastError(error.response.data.message)
    } else {
      toastError('Ocorreu um erro inesperado ao tentar atualizar as informações')
    }
  }
}

export const setSchedulingPermission = async (userId: string, data: Partial<ICreateUser>, page: number): Promise<{logs: IUserProps[], page: number, totalPages: number}> => {
    await api.patch(`/user/canScheduling/${userId}`, data);
    toastSuccess('Permissão de agendamento de usuário alterada com sucesso.');
    return await getAllUsers(page, 20);
}
export const setViewLogsPermission = async (userId: string, data: Partial<ICreateUser>, page: number): Promise<{logs: IUserProps[], page: number, totalPages: number}> => {
    await api.patch(`/user/canViewLogs/${userId}`, data);
    toastSuccess('Permissão de logs de usuário alterada com sucesso.');
    return await getAllUsers(page, 20);
}
export const setActivePermission = async (userId: string, data: Partial<ICreateUser>, page: number): Promise<{logs: IUserProps[], page: number, totalPages: number}> => {
    await api.patch(`/user/isActive/${userId}`, data);
    toastSuccess('Conta de usuário desativado com sucesso.');
    return await getAllUsers(page, 20);
}