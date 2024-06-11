<template>
  <router-view v-slot="{ Component }">
    <component :is="layoutComponent">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<script  lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import layoutPanel from './layout/layoutPanel.vue'
import { onMounted } from 'vue'

const route = useRoute()
const theme = ref<string | null>(localStorage.getItem('theme'))

const layoutComponent = computed(() => {
  if (route.name === 'login' || route.name === 'notFound') {
    return 'div'
  }
  return layoutPanel
})

onMounted(() => {
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<style>
</style>
