<template>
    <div class="flex gap-[20px] flex-wrap justify-center items-center content-center list-none mt-10">
        <form @submit.prevent="registerAppropriation" class="w-full flex flex-col items-center p-6 sm:p-8 md:p-10 ">
            <div 
                v-if="props.production"
                class="my-2"
                >
                <label 
                class="text-3xl font-medium text-[#EEE0D3] m-5"
                for="production">Aprobar por produccion</label>
                <input 
                v-model="myForm.aprovalProduction"
                class="w-5 h-5 text-[#F2564F] bg-[#3d3b46] border-[#575463] rounded focus:ring-[#F2564F] focus:ring-2"
                type="checkbox" id="production">
            </div>
            <div 
            v-if="props.maintenance"
            class="my-2"
            >
                <label
                class="text-3xl font-medium text-[#EEE0D3] m-5"
                for="maintenance">Aprobar por mantenimiento</label>
                <input
                v-model="myForm.aprovalMaintenance"
                class="w-5 h-5 text-[#F2564F] bg-[#3d3b46] border-[#575463] rounded focus:ring-[#F2564F] focus:ring-2"
                type="checkbox" id="maintenance">
            </div>
            <button class="w-full max-w-sm bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition" > Registrar </button>
        </form>
        
        <div class="p-8 text-2xl text-[#F3ECDE] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words mx-10 my-5">
                <p v-for="[key, value] in Object.entries(props.data)" :key="key" class="text-[#EEE0D3] text-justify font-medium text-2xl py-1">
                    {{ key }}: {{ value }}
                </p>
        </div>
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