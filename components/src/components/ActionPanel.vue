<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div v-if="!isEditMode" class="flex flex-col items-center w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 class="block text-xl font-medium text-[#F3ECDE] mb-1">{{ props.title }}</h3>
            <div class="flex flex-rows items-center ">
                <button @click="" class="w-full bg-[#F2564F] text-white p-3  m-5 font-semibold hover:bg-green-600 transition"> Modificar </button>
                <button @click="selectItem" class="w-full bg-[#F2564F] text-white p-3  m-5 font-semibold hover:bg-green-600 transition">Eliminar</button>
            </div>
        </div>
        <div v-else>
            <DeleteItem title="Desea Eliminar usuario" :data="props.data" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DeleteItem from './DeleteItem.vue';


const props = defineProps<{
    title: String
    data:{}
}>()

let selectedItem = ref<any>({});
let isEditMode = ref<Boolean>(false);

const selectItem = (item: any) => {
    selectedItem.value = item;
    isEditMode.value = true
}


/*
// Maneja la acción del primer botón
const handlePrimaryAction = () => {
  ;
}
<div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">


*/
</script>