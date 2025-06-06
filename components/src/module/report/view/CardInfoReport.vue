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
            :title="actionPanelTitle" 
            :data="selectedItem"
            router_delete="deleteOrder"
            router_update="updateOrder"
            :state_router_delete=false
            />
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ActionPanel from '../../common/components/ActionPanel.vue';
import type { Order } from '../interface/orders.interface';
import { useOrderItemStore } from '../stores/report.store';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import { useToast } from 'vue-toastification';

const client = useClientStorage()
const orderStore = useOrderItemStore()
const toast = useToast()

const props = defineProps<{
    data_list: Order[]
}>()

const emit = defineEmits(["onStatusMenu"])
const selectedItem = ref<any>({});
const isEditMode = ref<Boolean>(false);
const actionPanelTitle = ref<string>('');

const selectItem = (item: any) => {
    if(client.client.value?.access_level === AccessLevel.operator || client.client.value?.access_level === AccessLevel.technical ) {
        toast.warning("Client not authorized to perform operation")
    } else {
        selectedItem.value = item;
        actionPanelTitle.value = `Orden: ${selectedItem.value.id.slice(0,6)}`;
        isEditMode.value = true;
        orderStore.setOrderItem(item)
        emit("onStatusMenu",isEditMode.value);
    }
    
}


</script>