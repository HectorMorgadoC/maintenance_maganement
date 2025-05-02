<template>
    <div class="flex flex-col items-center w-full gap-4 lg:flex-row lg:justify-between">
        <div class="">
            <p class="text-white text-3xl lg:ml-20">{{ title }}</p>
        </div>
        <div class="bg-[#F2564F] text-white py-3 px-4 lg:mr-20 font-semibold hover:bg-green-600 transition">
            <a :href="patch">
                {{ titleButton }}
            </a>
        </div>
    </div>
    
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string
    title_button: string
    patch: string
}>()

const title = props.title
const titleButton = props.title_button
const patch = props.patch
</script>