import { ref } from 'vue';
import type { Client } from '../interfaces/client.interface';

const CLIENT_STORAGE_KEY = 'client';
const client = ref<Client | null>(null);

export function useClientStorage() {

    const saveClient = (newClient: Client) => {
        try {
            localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(newClient));
            client.value = newClient;
        } catch (err) {
        console.error('Error al guardar en localStorage:', err);
        }
    };


    const loadClient = () => {
        try {
            const raw = localStorage.getItem(CLIENT_STORAGE_KEY);
            console.log( raw )
            client.value = raw ? JSON.parse(raw) as Client : null;
        } catch (err) {
            console.error('Error al leer localStorage:', err);
            clearClient();
        }
    };

    const clearClient = () => {
        localStorage.removeItem(CLIENT_STORAGE_KEY);
        client.value = null;
    };

    
    loadClient();

    return {
        client,       
        saveClient,
        loadClient,
        clearClient,
    };
}