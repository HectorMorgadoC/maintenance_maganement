<template>
   <div class="flex justify-center items-start h-screen mx-4 sm:mx-8 md:mx-20 my-10">
        <form @submit.prevent="registerInfo" class="w-full max-w-md bg-[#3d3b46] p-6 sm:p-8 md:p-10 shadow-md">
            <h3 
            class="mb-5 block text-4xl text-center font-extrabolt text-[#EEE0D3] mb-1"
            >Registrar orden</h3>
            <p class="block font-medium text-center text-[#EEE0D3] my-2">{{ currentOrder.id }}</p>
            <div class="mb-3">
                <label 
                    for="team" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Equipo: {{ currentOrder.team }}
                </label>
                <select
                v-model=team
                id="team"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ currentOrder.team }}</option>
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
                    for="client" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Cliente: {{ currentOrder.client }}
                </label>
                <select
                v-model=client
                id="team"
                class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                >
                    <option disabled value="">{{ currentOrder.client }}</option>
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
                    for="notice_date" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Fecha de aviso: {{ currentOrder.date }}
                </label>
                <input
                    v-model=date
                    type="datetime-local"
                    id="notice_date"
                    name="notice_date"
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>

            <div class="mb-3">
                <label 
                    for="fault_description" 
                    class="block text-xl font-medium text-[#EEE0D3] my-2"
                >
                    Descripcion de la falla
                </label>
                <input
                    v-model=description
                    type="text"
                    id="fault_description"
                    name="fault_description"
                    :placeholder=currentOrder.description
                    class="placeholder-gray-400 w-full text-xl px-4 py-3 text-[#F3ECDE] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F2564F]"
                />
            </div>
            <div class="mb-3">
                <label for="is_actived" class="flex items-center gap-3 text-xl font-medium text-[#EEE0D3] my-2">
                    Estado de la orden
                    <input
                        v-model="order_state"
                        type="checkbox"
                        id="order_state"
                        name="order_state"
                        class="w-5 h-5 accent-[#F2564F]"
                    />
                </label>
            </div>
            <button
                @click="onRegister({
                    team: values.team,
                    client: values.client,
                    notice_date: values.date,
                    fault_description: values.description,
                    order_state: values.order_state
                }, currentOrder.id as UUIDTypes)"
                type="submit"
                class="w-full bg-[#FC3B47] text-xl text-[#EEE0D3] py-3 mt-4 font-semibold hover:bg-[#F2564F] transition"
            >
                Registrar
            </button>
        </form>
    </div>
    
</template>
<script setup lang="ts">
    import { ref } from 'vue';
    import router from '../../../router';
    import { useToast } from 'vue-toastification';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    import { useOrderItemStore } from '../stores/report.store';
    import type { UpdateOrder } from '../interface/updateOrder.interface';
    import { AccessLevel } from '../../auth/interfaces/access-level.enum';
    import { updateOrder } from '../action/updateReport.action';
    import type { UUIDTypes } from 'uuid';
    import { useClientStorage } from '../../auth/composable/useClientStorage';
    import type { Team } from '../../team/interface/team.interface';
    import type { SubClient } from '../../auth/interfaces/subClient-interface';

    const clientStore = useClientStorage();
    const listTeam = ref<Team[]>([])
    const listClient = ref<SubClient[]>([]);
    const toast = useToast();

    listTeam.value = clientStore.client.value?.teams || []

    if(clientStore.client.value?.access_level != AccessLevel.operator && clientStore.client.value?.clients ){
        listClient.value = clientStore.client.value?.clients
    } else {
        listClient.value.push({
            id: clientStore.client.value?.id || "",
            username: clientStore.client.value?.username || ""
        })
    }

    const currentOrder = useOrderItemStore().orderItem;
    const idTeam = ref<string>(listTeam.value.find(t => t.name === currentOrder.team)?.id?.toString() || "")
    const idClient = ref<string>(listClient.value.find(c => c.username === currentOrder.client)?.id.toString() || "")

    const schema = yup.object({
        team: yup.string(),
        client: yup.string(),
        notice_date: yup.string(),
        fault_description: yup
        .string()
        .min(10,"Minimo 10 caracteres")
        .max(200,"Maximo  200 caracteres")
    })

    const { errors,values,resetForm } = useForm({
        validationSchema: schema,
        initialValues: {
        team : idTeam.value,
        client: idClient.value,
        date: currentOrder.date,
        description: currentOrder.description,
        order_state:currentOrder.state
        }
    })

    const { value: team } = useField<string>('team')
    const { value: client } = useField<string>('client')
    const { value: date } = useField<string>('date')
    const { value: description } = useField<string>('description')
    const { value: order_state } = useField<boolean>('order_state')
    
    const onStatus = ref<boolean>(false)
    
    const registerInfo = () => {
        if(errors) {
            if("team" in errors.value) toast.warning(`Team: ${errors.value.team}`)
            if("client" in errors.value) toast.warning(`Client: ${errors.value.client}`)
            if("notice_date" in errors.value) toast.warning(`Notice date: ${errors.value.notice_date}`)
            if("fault_description" in errors.value) toast.warning(`Fault description: ${errors.value.fault_description}`)
            onStatus.value = false
        } 

        onStatus.value = true
    }
    
    const onRegister = async (newOrder: UpdateOrder,id: UUIDTypes) => {
        console.log("estado de orden: "+newOrder.order_state)
        if (clientStore.client.value?.access_level != AccessLevel.technical) {
            try {
                const response = await updateOrder(newOrder,id);
                if (response) {
                    if ("statusCode" in response) {
                        if(response.statusCode === 404 ) router.replace({ name: 'NotFound' });
                        if(response.statusCode === 400 ) toast.warning(`Bad request ${response.message}`)
                    
                        if(response.statusCode === 403 || response.statusCode === 401) {
                            toast.error("Not authorized")
                            router.replace({ name: 'login' });
                        }

                        if(response.statusCode === 0 || response.statusCode === 500) router.replace({ name: 'ServerError' });
                    }

                    if("id" in response) {
                        toast.info("New registered customer")
                        resetForm()
                        router.replace({name: "order"})
                    }
                }
            } catch (error) {
                toast.error("Request error")
            }
        }
    }

</script>