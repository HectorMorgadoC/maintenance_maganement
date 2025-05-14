import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus } from '../interfaces/auth-status.enum';
import type { Client } from '../interfaces/client.interface';
import { loginAction } from '../action/login.action';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const client = ref<Client | undefined>();
  const token = ref<string>(cookies.get('token') || '');

  const login = async (username: string, password: string) => {
    try {
      const loginResponse = await loginAction(username, password);
      if ('error' in loginResponse) {
        logout();
        return false;
      }

      client.value = loginResponse;
      //token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      return logout();
    }
  };


  const logout = () => {
    cookies.remove('token');

    authStatus.value = AuthStatus.Unauthenticated;
    client.value = undefined;
    token.value = '';
    return false;
  };
/*
  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      client.value = statusResp.user;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };
*/
  return {
    client: client,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    // Actions
    login,
    logout
  };
});

/*
 cookies.set('token', loginResponse.token, '1d'); // Expira en 1 día, ajusta según necesites
 // Eliminamos la cookie en lugar de eliminar de localStorage
    cookies.remove('token');

    Estas cookies están expuestas al entorno de JavaScript y pueden ser robadas si tu aplicación sufre un ataque XSS. Si debes usarlas por razones prácticas, sigue estas recomendaciones:
a. Marca la cookie como Secure (solo enviada por HTTPS):

cookies.set('token', token, '1d', '/', '', true); // el último parámetro activa `Secure`

    '1d': duración
    '/': path (accesible desde toda la app)
    '': dominio (por defecto)
    true: Secure
 */