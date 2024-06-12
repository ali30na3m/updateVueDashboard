<template>
  <div
    class="flex items-center justify-center flex-col gap-6 h-[100vh] dark:bg-zinc-800 dark:text-white"
  >
    <h1 class="text-2xl sm:text-2xl md:text-6xl">{{ $t('notfound') }}</h1>
    <div>
      <router-link
        class="flex items-center gap-4 !text-blue-400 py-2 px-4 border-2 border-blue-400 rounded-lg text-xs sm:text-base"
        to="dashboard"
      >
        <ArrowLeftOutlined />
        {{ $t('gotoDashboard') }}
      </router-link>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
</script>
  
  