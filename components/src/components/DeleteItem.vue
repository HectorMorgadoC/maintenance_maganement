<template>
    <div class="fixed inset-0 flex items-center justify-center">
        <div class="w-11/12 max-w-md bg-[#3d3b46] p-6 ">
            <h3 class="text-2xl font-medium text-[#F3ECDE] mb-4 text-center">{{ props.title }}</h3>
            
            <div class="w-full text-white mb-6">
                <p v-for="[key, value] in Object.entries(data)" :key="key" class="my-2">
                    {{ key }}: {{ value }}
                </p>
            </div>

            <div class="flex justify-center gap-4">
                <button 
                    @click="deleteInfo" 
                    class="w-30 bg-[#F2564F] text-white p-3  m-5 font-semibold hover:bg-green-600 transition"
                >
                    Sí
                </button>
                <button 
                    @click="cancelAction" 
                    class="w-30 bg-[#F2564F] text-white p-3  m-5 font-semibold hover:bg-red-600 transition"
                >
                    No
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string,
    data: Record<string, any>
}>()

const emit = defineEmits(['confirm', 'cancel']);

const deleteInfo = () => {
    emit('confirm', props.data);
}

const cancelAction = () => {
    emit('cancel',false);
}
</script>