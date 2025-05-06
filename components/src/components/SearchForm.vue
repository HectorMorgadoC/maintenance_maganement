<template>
    <div v-if="!isEditMode" class="flex flex-col justify-center items-center h-screen">
        <form @submit.prevent="onSearch" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#F2564F] mb-1"
            >Busqueda de producto</h3>
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
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-[#F2564F] text-white py-3 mt-3 font-semibold hover:bg-green-600 transition"
            >
                Registrar
            </button>
        </form>
        <div class="flex gap-[20px] flex-wrap justify-center items-center content-center list-none mt-10">
            <div v-if="producto.length <= 0" >
                <h3 class="mb-5 block text-4xl text-center font-extrabolt text-[#F2564F] mb-1">No hay registro</h3>
            </div>
            <div v-else>
                <li v-for="item of producto" >
                    <ul  class="w-fit flex flex-col justify-center items-start p-8 text-2xl text-[#F3ECDE] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words">
                        <button @click="selectItem(item)">
                            <li v-for="[key, value] in Object.entries(item)" :key="key" class="my-1">
                                {{ key }}: {{ value }}
                            </li>
                        </button>
                    </ul>
                </li>
            </div>
        </div>
    </div>
    <div v-else>
        <ActionPanel 
            title="ysodfdsdbsdsasdf" 
            :data="selectedItem" />
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import ActionPanel from './ActionPanel.vue';

interface Producto {
    name: string,
    lastname: string,
    city: string,
    dateInit: string
}


const myForm = reactive({
    name: "",
    lastname: "",
    city: "",
    dateInit: ""
})

const producto = ref<Producto[]>([])

const onSearch = () => {
    producto.value.push({
        name: myForm.name,
        lastname: myForm.lastname,
        city: myForm.city,
        dateInit: myForm.dateInit
    })
}

let selectedItem = ref<any>({});
let isEditMode = ref<Boolean>(false);

const selectItem = (item: any) => {
    selectedItem.value = item;
    isEditMode.value = true
}
</script>
