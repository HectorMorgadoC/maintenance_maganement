<template>
    <div v-if="!isEditMode" class="flex gap-[25px] flex-wrap justify-center items-center content-center list-none mt-10">
        <li 
        v-for="item of props.data_list" 
        :key="item.id"
        >
        <ul  :class="[
    'w-full max-w-xl flex flex-col justify-center items-start p-8 text-3xl hover:bg-[#575463] overflow-hidden break-words sm:w-screen',
    colorBackgroundCardCulminated,
    colorTextCulminated
    ]">
            <button @click="selectItem(item)">
                <p class="my-2 pl-2 text-justify"> Id: {{ item.id }}</p>
                <p class="my-2 pl-2 text-justify"> Fecha de creacion: {{ item.date.slice(0,10) }}</p>
                <p class="my-2 pl-2 text-justify"> Descripcion: {{ item.description }}</p>
                <p class="my-2 pl-2 text-justify"> Progreso: {{ progresTraslate(item.state) }}</p>
                <p class="my-2 pl-2 text-justify"> Creador: {{ item.client }}</p>
                <p class="my-2 pl-2 text-justify"> Equipo: {{ item.team }}</p>
                <p class="my-2 pl-2 text-justify"> Observacion: {{ item.observation }}</p>
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
import { useOrderItemStore } from '../stores/order.store';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';
import { useToast } from 'vue-toastification';
import { OrderState } from '../interface/orderState.interface';

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
const colorTextCulminated = ref<string>("text-[#EEE0D3]")
const colorBackgroundCardCulminated = ref<string>("bg-[#3d3b46]")

const progresTraslate = (item: OrderState) => {
    if(item === OrderState.Esperando) return "Esperando" 
    if(item === OrderState.Progresando) return"Progresando"
    if(item === OrderState.Culminado) { 
        colorTextCulminated.value = "text-[#dbc69b]"
        colorBackgroundCardCulminated.value = "bg-[#4A3B34]"
        return "Culminado"
    }
}

const selectItem = (item: Order) => {
    if(client.client.value?.access_level !== AccessLevel.operator && client.client.value?.access_level !== AccessLevel.technical ) {
        selectedItem.value = item;
        actionPanelTitle.value = `Orden: ${selectedItem.value.id}`;
        isEditMode.value = true;
        orderStore.setOrderItem(item)
        emit("onStatusMenu",isEditMode.value);
    }
    
}

</script>