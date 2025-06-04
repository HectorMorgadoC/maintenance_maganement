<template>
    <ButtonCreate title="Equipo" title_button="Crear equipo" patch="createTeam"/>
    <CardInfoTeam :data_list=listTeam title="team" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonCreate from "../../common/components/ButtonCreate.vue"
import { useClientStorage } from "../../auth/composable/useClientStorage";
import CardInfoTeam from "../view/CardInfoTeam.vue";
import type { Team } from "../interface/team.interface";


const clientStore = useClientStorage();
const listTeam = ref<Team[]>([]);
listTeam.value = clientStore.client.value?.teams || []


</script>