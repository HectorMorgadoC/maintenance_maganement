import { managementApi } from '../../../api/managementApi';
import type { MessageError } from '../../common/interface/message-error.interface';
import { isAxiosError } from 'axios';
import type { Client } from '../interfaces/client.interface';
import { cookies } from './cookies';


export const loginAction = async (
  username: string,
  password: string,
): Promise< MessageError | Client > => {
  try {
    const response  = await managementApi.post<Client>('/client/login', {
      username,
      password,
    });

    const bearer: string = response.headers['authorization'];
    const token = bearer.split(" ")[1];
    const  { client } = response.data;

    cookies.set('token', token, '1d');

    return {
      username: client.username,
      access_level: client.access_level,
      teams: client.teams,
      process: client.process
    };
  } catch (error) {

    return {
      message: `${isAxiosError(error) && error.response?.data}`,
      error: `${isAxiosError(error) && error.response?.statusText}`,
      statusCode: isAxiosError(error) && error.response?.status || 500
    }
  }
};
