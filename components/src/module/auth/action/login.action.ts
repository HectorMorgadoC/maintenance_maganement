
import { managementApi } from '../../../api/managementApi';
import type { MessageError } from '../../common/interface/message-error.interface';
import { isAxiosError } from 'axios';
import type { Client } from '../interfaces/client.interface';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

export const loginAction = async (
  username: string,
  password: string,
): Promise<MessageError | Client > => {
  try {
    const response  = await managementApi.post<Client>('/client/login', {
      username,
      password,
    });

    const token = response.headers['authorization'];
    console.log(token)
    cookies.set('token', token, '1d');

    return {
      username: response.data.username,
      access_level: response.data.access_level,
      teams: response.data.teams,
      process: response.data.process
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
          message: "Credentials are not valid",
          error: "Unauthorized",
          statusCode: 401
      };
    }
    console.log(error);
    throw new Error('Credentials are not valid');
  }
};
