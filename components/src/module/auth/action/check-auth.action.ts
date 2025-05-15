import { isAxiosError } from 'axios';
import { managementApi } from '../../../api/managementApi';
import type { AuthResponse } from '../interfaces/auth.response';
import type { Client } from '../interfaces/client.interface';
import { useCookies } from 'vue3-cookies';

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
    const { cookies } = useCookies()
    const localToken = cookies.get("token");
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }


    const { data } = await managementApi.get<AuthResponse>('/client/login/check');
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
