<template>
    <div v-if="!isEditMode" class="flex gap-[25px] flex-wrap justify-center items-center content-center list-none mt-10">
        <li 
        v-for="item of props.data_list" 
        :key="item.id"
        >
        <ul  class="w-full max-w-xl flex flex-col justify-center items-start p-8  text-3xl text-[#EEE0D3] bg-[#3d3b46] hover:bg-[#575463] overflow-hidden break-words sm:w-screen p-8">
            <button @click="selectItem(item)">
                <li v-for="[key, value] in Object.entries(item)" :key="key" class="my-2 pl-2 text-justify">
                    {{ key }}: {{ value }}
                </li>
            </button>
            
        </ul>
    </li>
    </div>
    <div v-else>
        <ActionPanel 
            :title="selectedItem.name" 
            :data="selectedItem"
            router_delete="deleteProcess"
            router_update="updateProcess"
            :state_router_delete=true
            />
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from '../../common/components/ActionPanel.vue';
import { useProcessItemStore } from '../stores/process.store';
import type { Process } from '../interface/process.interface';


const processStore = useProcessItemStore()

const props = defineProps<{
    data_list: Process[]
}>()


const selectedItem = ref<any>({});
const isEditMode = ref<Boolean>(false);


const selectItem = (item: any) => {
    selectedItem.value = item;
    isEditMode.value = true
    processStore.setProcessItem(item)
}

</script>