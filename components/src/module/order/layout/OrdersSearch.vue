<template>
    <ButtonCreate title="Ordenes" title_button="Crear orden" patch="createOrder"/>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <div v-if="!onMenu">
            <form @submit.prevent="getListOrder" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Busqueda de ordenes de trabajo</h3>
            <div class="mb-3">
                <label 
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Equipo
                </label>
                <select
                v-model="OrderForm.team"
                name="process" 
                id="process"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un equipo</option>
                    <option 
                    v-for="(team, index) in listTeam"
                    :key="index"
                    :value="team.id"
                    >
                        {{ team.name }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="lastname" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Cliente
                </label>
                <select
                v-model="OrderForm.client"
                name="client" 
                id="client"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">Seleccione un cliente</option>
                    <option 
                    v-for="(client, index) in listClient"
                    :key="index"
                    :value="client.id"
                    >
                        {{ client.username }}</option>
                    
                </select>
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de creacion
                </label>
                <input
                    v-model="OrderForm.date"
                    type="datetime-local"
                    id="date"
                    name="date"
                    placeholder="Ingrese la fecha de creacion"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="city" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Estado de orden
                </label>
                <select
                v-model="OrderForm.is_actived"
                name="is_actived" 
                id="is_actived"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option 
                    v-for="(is_actived, index) in statusList"
                    :key="index"
                    >
                        {{ is_actived }}</option>
                    
                </select>
            </div>


            <button
                type="submit"
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Consultar
            </button>
        </form>
        </div>
        
        <div class="flex gap-[20px] flex-row flex-wrap justify-center items-center content-center list-none mt-10">
            <div v-if="!onStatus" >
                <h3 class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1">No hay registro</h3>
            </div>
            <CardInfoOrder v-else 
            :data_list=listOrders 
            title="ordenes"
            @on-status-menu="statusMenu"
            />
        </div>
    </div>

</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useClientStorage } from '../../auth/composable/useClientStorage';
import type { Team } from '../../team/interface/team.interface';
import CardInfoOrder from '../view/CardInfoOrder.vue';
import type{ Order } from '../interface/orders.interface';
import { getOrderFilters } from '../action/getOrdersFilter.action';
import router from '../../../router';
import { useToast } from 'vue-toastification';
import ButtonCreate from '../../common/components/ButtonCreate.vue';
import type { SubClient } from '../../auth/interfaces/subClient-interface';
import { AccessLevel } from '../../auth/interfaces/access-level.enum';

const clientStore = useClientStorage();
const listTeam = ref<Team[]>([])
const listClient = ref<SubClient[]>([]);

const toast = useToast()
listTeam.value = clientStore.client.value?.teams || []

if(clientStore.client.value?.access_level != AccessLevel.operator && clientStore.client.value?.clients ){
    listClient.value = clientStore.client.value?.clients
} else {
    listClient.value.push({
        id: clientStore.client.value?.id || "",
        username: clientStore.client.value?.username || ""
    })
}


const OrderForm = reactive({
    team:"",
    client:"",
    date:"",
    is_actived:""
})

const statusList = [true,false];
const paramsUrl = ref<String>("")
const onStatus = ref<boolean>(false)
const onMenu =ref<boolean>(false)
const listOrders = ref<Order[]>([])

const getListOrder = async () => {
    try {
        const response = await getOrderFilters(
            OrderForm.team,
            OrderForm.client,
            OrderForm.date,
            OrderForm.is_actived
        );

        if (Array.isArray(response)) {
            if(response.length > 0) {
                listOrders.value = response;
                onStatus.value = true;
            } else {
                onStatus.value = false;
            }
            resetForm()
        }
        
        if ("statusCode" in response) {
            if(response.statusCode === 404 ) {
                router.replace({ name: 'NotFound' });
            }

            if(response.statusCode === 400 ) {
                toast.warning(`Bad Request: ${response.message}`);
            }

            if(response.statusCode === 401 ) {
                toast.error("Not authorized")
                router.replace({ name: 'login' });
            }
            
            if(response.statusCode === 0 || response.statusCode === 500) {
                router.replace({ name: 'ServerError' });
            }
        }

    } catch (error) {
        toast.error("Request error")
    }
}

    const statusMenu = (onStatusMenu: boolean) => {
        console.log(onMenu.value)
        onMenu.value = onStatusMenu
        console.log(onMenu.value)
    }

    const resetForm = () => {
        OrderForm.team = ""
        OrderForm.client = ""
        OrderForm.date = ""
        OrderForm.is_actived = ""
        paramsUrl.value = ""
    }
</script>
