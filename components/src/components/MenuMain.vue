<template>
    <div class="flex gap-[20px] flex-wrap justify-center items-center content-center">
        <CardMain v-if="true" title="title1" message="Esto es un mesaje unico" /> 
        <CardMain title="title2" message="Esto es otro mensaje unico"/>
        <CardMain title="title3" message="Esto es otro mensaje uncio"/>
        <CardMain title="title3" message="Esto es otro mensaje uncio"/>
        <CardMain title="title3" message="Esto es otro mensaje uncio"/>
    </div>
</template>

<script setup lang="ts">
import CardMain from './CardMain.vue';

</script>