<template>
    <div class="flex gap-[20px] flex-wrap justify-center items-center content-center list-none mt-10">
        <form @submit.prevent="registerAppropriation" class="w-full flex flex-col items-center p-6 sm:p-8 md:p-10 ">
            <div v-if="props.production">
                <label 
                class="text-3xl font-medium text-gray-500 m-5"
                for="production">Aprobar por produccion</label>
                <input 
                v-model="myForm.aprovalProduction"
                class="w-5 h-5 text-[#F2564F] bg-[#3d3b46] border-[#575463] rounded focus:ring-[#F2564F] focus:ring-2"
                type="checkbox" id="production">
            </div>
            <div v-if="props.maintenance">
                <label
                class="text-3xl font-medium text-gray-500 m-5"
                for="maintenance">Aprobar por mantenimiento</label>
                <input
                v-model="myForm.aprovalMaintenance"
                class="w-5 h-5 text-[#F2564F] bg-[#3d3b46] border-[#575463] rounded focus:ring-[#F2564F] focus:ring-2"
                type="checkbox" id="maintenance">
            </div>
            <button class="w-30 bg-[#F2564F] text-white p-3 text-xl m-5 font-semibold hover:bg-red-600 transition" > Registrar </button>
        </form>
        
        <p class="w-fit flex flex-col justify-center items-start p-8 text-2xl text-[#F3ECDE] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words">
                <li v-for="[key, value] in Object.entries(props.data)" :key="key" class="my-1">
                    {{ key }}: {{ value }}
                </li>
        </p>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

const props = defineProps<{
    data: Record<string, any>
    production: boolean,
    maintenance: boolean
}>()

const myForm = reactive({
    aprovalProduction: false,
    aprovalMaintenance: false
})

const registerAppropriation = () => {
    console.log( {
        maintenance: myForm.aprovalMaintenance,
        production: myForm.aprovalProduction
    })
}

</script>