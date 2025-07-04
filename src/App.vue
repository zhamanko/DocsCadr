<script setup>
import SlideBarLeft from "@/components/SlideBarLeft.vue";
import Messange from "./components/Messange.vue";
</script>

<template>
  <SlideBarLeft/>
  <router-view class="flex-1"></router-view>
    <Messange/>
</template>
