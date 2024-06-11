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

username.value = localStorage.getItem('username')

const updateTime = (): void => {
  currentTime.value = new Date().toLocaleTimeString()
}

let timeNow: any

onMounted(() => {
  timeNow = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timeNow)
})
</script>

<style>
</style>