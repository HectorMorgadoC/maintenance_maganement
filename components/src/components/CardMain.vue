<template>
    <div class="w-120 h-80 max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-8 shadow-md hover:bg-[#575463] overflow-hidden break-words">     
        <a href="https://claude.ai/chat/18a085f5-56c7-4014-9cee-8e73ce81f40a" >
            <h3 
            class="mb-5 block text-4xl font-extrabolt text-[#F2564F] mb-1"
            >{{ title }}</h3>
            <p class="text-[#F3ECDE] font-normal">
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