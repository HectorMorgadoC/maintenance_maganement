<template>
    <div class="w-200 max-w-2xl h-80 bg-[#3d3b46] p-6 sm:w-screen p-8 md:p-8 shadow-md hover:bg-[#575463] overflow-hidden break-words">     
        <a href="/" >
            <h3 
            class="mb-5 block text-4xl font-extrabolt text-[#FC3B47] mb-1"
            >{{ title }}</h3>
            <p class="text-[#EEE0D3] font-medium text-xl">
                {{ message }}
            </p>
        </a>
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    title: string,
    message: string
}>()

const title = ref<string>(props.title);
const message = ref<string>(props.message);

</script>