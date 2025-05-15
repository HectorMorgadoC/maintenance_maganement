<template>
    <div class="flex justify-center items-start h-screen m-20">
        <form 
            @submit.prevent="onLogin"
            class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h2 v-if="statusExceptionMessage" class="text-[#FC3B47] text-2xl">{{ exceptionMessage }}</h2>
            <div class="mb-4">
                <label 
                    for="client" 
                    class="block font-medium text-[#EEE0D3] my-2"
                >
                    Cliente
                </label>
                <input
                    @click="statusExceptionMessage = false"
                    v-model="myForm.username"
                    type="client"
                    id="client"
                    name="client"
                    ref="clientInputRef"
                    required
                    placeholder="Ingrese nombre del cliente"
                    class="placeholder-gray-400 w-full px-4 py-3 text-[#98B6B6] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-4">
                <label 
                    for="password" 
                    class="block font-medium text-[#EEE0D3] my-2"
                >
                    Contraseña
                </label>
                <input
                    @click="statusExceptionMessage = false"
                    v-model="myForm.password"
                    type="password"
                    id="password"
                    name="password"
                    ref="passwordInputRef"
                    required
                    placeholder="Ingrese contraseña"
                    class="placeholder-gray-400 w-full px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <button
                type="submit"
                class="w-full bg-[#FC3B47] text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Iniciar sesión
            </button>
        </form>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import { useClientStorage } from '../composable/useClientStorage';
import { useCookies } from 'vue3-cookies';

    const router = useRouter()
    const authStores = useAuthStore();
    const clientInputRef = ref<HTMLInputElement | null>(null);
    const passwordInputRef = ref<HTMLInputElement | null>(null);
    const statusExceptionMessage = ref<boolean>(false) 
    const exceptionMessage = ref<string>("");
    const { clearClient } = useClientStorage()

    clearClient();

    const myForm = reactive({
        username: "",
        password: "",
        remenberMe: false
    })

    const onLogin = async () => {
        if(myForm.username === "") {
            return clientInputRef.value?.focus()
        }

        if(myForm.password === "") {
            return passwordInputRef.value?.focus()
        }

        const login = await authStores.login(myForm.username,myForm.password)

        if(!login) {
            exceptionMessage.value = authStores.message
            statusExceptionMessage.value = true
        }
        
        if(authStores.isAuthenticated) {
            router.replace({
                name: "menu"
            })
        }
    }

    
</script>