<template>
    <div class="flex justify-center items-start h-screen m-20">
        <form v-if="!onStatus" @submit.prevent="onRegister" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#F2564F] mb-1"
            >Registrar producto</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-sm font-medium text-gray-500 mb-1"
                >
                    Nombre
                </label>
                <input
                    v-model="myForm.name"
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Ingrese nombre 50 caracteres"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-sm font-medium text-gray-500 mb-1"
                >
                    Apellido
                </label>
                <input
                    v-model="myForm.lastname"
                    type="text"
                    id="lastname"
                    name="lastname"
                    required
                    placeholder="Ingrese apellido 50 caracteres"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-sm font-medium text-gray-500 mb-1"
                >
                    Ciudad
                </label>
                <input
                    v-model="myForm.city"
                    type="text"
                    id="city"
                    name="city"
                    required
                    placeholder="Ingrese ciudad 50 caracteres"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-sm font-medium text-gray-500 mb-1"
                >
                    Fecha de nacimiento
                </label>
                <input
                    v-model="myForm.dateInit"
                    type="date"
                    id="dateinit"
                    name="dateinit"
                    required
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <button
                @click="registerInfo"
                type="submit"
                class="w-full bg-[#F2564F] text-white py-3 mt-3 font-semibold hover:bg-green-600 transition"
            >
                Registrar
            </button>
        </form>
        <div v-else>
            <DataConfirmation 
            title="Desea realizar registro" 
            :data="myForm"
            @on-registration-status="cancelRegisterInfo"
            />
        </div>
    </div>
    
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import DataConfirmation from './DataConfirmation.vue';


const myForm = reactive({
    name: "",
    lastname: "",
    city: "",
    dateInit: ""
})

const onRegister = () => {
    console.log(myForm.lastname)
}



const registerInfo = () => {
    onStatus.value = true
}

const cancelRegisterInfo = (value: boolean) => {
    console.log(value)
    onStatus.value = value
}
</script>