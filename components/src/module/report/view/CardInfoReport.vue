<template>
    <div v-if="!isEditMode" class="flex gap-[25px] flex-wrap justify-center items-center content-center list-none mt-10">
        <li 
        v-for="item of props.data_list" 
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
        <ActionPanelOptional 
            :title="actionPanelTitle" 
            :data="selectedItem"
            router_delete="deleteReport"
            router_update="updateReport"
            router_approval="approvalReport"
            :state_router_delete=false
            />
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useReportItemStore } from '../stores/report.store';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import { useToast } from 'vue-toastification';
import ActionPanelOptional from '../../common/components/ActionPanelOptional.vue';

const client = useClientStorage()
const reportStore = useReportItemStore()
const toast = useToast()

const props = defineProps<{
    data_list: Report[]
}>()

const emit = defineEmits(["onStatusMenu"])
const selectedItem = ref<any>({});
const isEditMode = ref<Boolean>(false);
const actionPanelTitle = ref<string>('');

const selectItem = (item: any) => {
    if(client.client.value?.access_level === AccessLevel.operator || client.client.value?.access_level === AccessLevel.production_supervisor) {
        toast.warning("Client not authorized to perform operation")
    } else {
        selectedItem.value = item;
        actionPanelTitle.value = `Report: ${selectedItem.value.id_report.slice(0,6)}`;
        isEditMode.value = true;
        reportStore.setReportItem(item)
        emit("onStatusMenu",isEditMode.value);
    }
    
}


</script>