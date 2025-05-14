import { isAxiosError } from 'axios';
import { cookies } from './cookies';
import { managementApi } from '../../../api/managementApi';
import type { AuthResponse } from '../interfaces/auth.response';
import type { Client } from '../interfaces/client.interface';

interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  client: Client;
  token: string;
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = cookies.get("token");
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }

    const { data } = await managementApi.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      client: data.client,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
      };
    }

    throw new Error('The session could not be verified');
  }
};
