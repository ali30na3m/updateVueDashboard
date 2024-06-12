<template>
  <div class="flex items-center justify-center flex-col gap-10">
    <h2 class="text-2xl md:text-5xl font-semibold">{{ currentTime }}</h2>
    <h3 class="text-lg md:text-4xl">{{ username }},{{ greetingToUser() }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { greetingToUser } from './uniqueMessage'

const currentTime = ref<string>(new Date().toLocaleTimeString())
const username = ref<string | null>(null)

const updateTime = (): void => {
  currentTime.value = new Date().toLocaleTimeString()
}

const getTimeNow = setInterval(updateTime, 1000)

onMounted(() => {
  getTimeNow
  username.value = localStorage.getItem('username')
})

onUnmounted(() => {
  clearInterval(getTimeNow)
})
</script>
