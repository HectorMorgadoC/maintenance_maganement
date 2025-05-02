<template>
    <div v-if="!isEditMode" class="flex gap-[20px] flex-wrap justify-center items-center content-center list-none mt-10">
        <li 
        v-for="item of props.data_list" 
        :key="item.id"
        >
        <ul  class="w-fit flex flex-col justify-center items-start p-8 text-2xl text-[#F3ECDE] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words">
            <button @click="selectItem(item)">
                <li v-for="[key, value] in Object.entries(item)" :key="key" class="my-1">
                    {{ key }}: {{ value }}
                </li>
            </button>
            
        </ul>
    </li>
    </div>
    <div v-else>
        <ActionPanel 
            title="ysodfdsdbsdsasdf" 
            :data="selectedItem" />
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from './ActionPanel.vue';

const props = defineProps<{
    data_list: any[]
}>()

let selectedItem = ref<any>({});
let isEditMode = ref<Boolean>(false);

const selectItem = (item: any) => {
    selectedItem.value = item;
    isEditMode.value = true
}

</script>