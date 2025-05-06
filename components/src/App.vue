<template>
  <picture class="flex justify-center lg:justify-start w-fit">
    <source media="(max-width: 600px)">
    <img src="/public/images/floriambra_logo.svg" 
          alt="logo" 
          class="max-w-50 max-h-100">
  </picture>
  <!-- 
  <UpdateDelede 
      title="ysodfdsdbsdsasdf" 
      title-button-one="Modificar" 
      title-button-two="Eliminar"
      :data= data />
       <SearchForm />
  -->
  <ApproveRegistration :data="data" :production="true" :maintenance="true" />
</template>

<script setup lang="ts">
import MenuMain from './components/MenuMain.vue';

// import CardMain from './components/CardMain.vue';
import FormLogin from './components/FormLogin.vue';
import SubMenu from './components/SubMenu.vue';
import UpdateDelede from './components/ActionPanel.vue';
import CreateResource from './components/CreateResource.vue';
import UpdateResource from './components/UpdateResource.vue';
import SearchForm from './components/SearchForm.vue';
import CardInfo from './components/CardInfo.vue';
import ApproveRegistration from './components/ApproveRegistration.vue';


const data = {
  id: 1213413412,
  name: "Prueba 1",
  lastname: "Prueba2"
}
</script>