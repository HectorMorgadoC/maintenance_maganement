<template>
  <picture class="flex justify-center lg:justify-start w-fit">
    <source media="(max-width: 600px)">
    <img src="/public/images/floriambra_logo.svg" 
          alt="logo" 
          class="max-w-50 max-h-100">
  </picture>
  <LoginView />

</template>

<script setup lang="ts">
import LoginView from './module/auth/views/LoginView.vue';



</script>