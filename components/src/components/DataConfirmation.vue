<template>
    <div v-if="!onStatus" class="fixed inset-0 flex items-center px-5 justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">
            <h3 class="text-3xl font-medium text-[#F3ECDE] my-5 text-center">{{ props.title }}</h3>
            
            <div class="w-full text-2xl text-white mb-6 mx-5">
                <p v-for="[key, value] in Object.entries(data)" :key="key" class="mx-3">
                    {{ key }}: {{ value }}
                </p>
            </div>

            <div class="flex justify-center gap-4">
                <button 
                    @click="RegisterInfo" 
                    class="w-30 bg-[#F2564F] text-white p-3 text-xl m-5 font-semibold hover:bg-green-600 transition"
                >
                    Sí
                </button>
                <button 
                    @click="cancelAction" 
                    class="w-30 bg-[#F2564F] text-white p-3 text-xl m-5 font-semibold hover:bg-red-600 transition"
                >
                    No
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    title: string,
    data: Record<string, any>
}>()

const issuDenialStatus = defineEmits(["onRegistrationStatus"])

const onStatus = ref<Boolean>(false)

const RegisterInfo = () => {
    console.log(props.data)
}

const cancelAction = () => {
    onStatus.value = true
    issuDenialStatus("onRegistrationStatus",false)
}
</script>