<template>
    <div v-if="!isEditMode" class="flex flex-col justify-center items-center min-h-screen">
        <form @submit.prevent="onSearch" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Busqueda de producto</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
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
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
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
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
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
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
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
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Registrar
            </button>
        </form>
        <div class="flex gap-[20px] flex-row flex-wrap justify-center items-center content-center list-none mt-10">
            <div v-if="producto.length <= 0" >
                <h3 class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1">No hay registro</h3>
            </div>
            <div v-else
            class="flex flex-row flex-wrap justify-center items center text-[#EEE0D3] font-medium text-xl"
            >
                <div v-for="item of producto" >
                    <p  class="p-8 text-2xl text-[#F3ECDE] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words mx-10 my-5">
                        <button @click="selectItem(item)">
                            <li v-for="[key, value] in Object.entries(item)" :key="key" class="text-[#EEE0D3] text-justify font-medium text-2xl py-1">
                                {{ key }}: {{ value }}
                            </li>
                        </button>
                    </p>
                </div>
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
import ActionPanel from '../module/common/components/ActionPanel.vue';

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
