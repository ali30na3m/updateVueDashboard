<template>
  <a-layout :class="['h-[100vh] dark:bg-zinc-800']">
    <a-layout-sider
      collapsible
      breakpoint="lg"
      collapsed-width="0"
      theme="light"
      :reverseArrow="locale === 'fa'"
      :class="['!bg-white dark:!bg-zinc-800', locale === 'fa' ? 'text-right' : 'text-left']"
      :style="{ order: siderOrder }"
    >
      <h2 class="mx-5 my-6 text-xl">{{ $t('menu') }}</h2>
      <span class="block bg-black/10 h-[2px] w-full"></span>
      <a-menu class="dark:!bg-zinc-800 mt-4" mode="inline">
        <a-menu-item v-for="(router, index) in filterRouter" :key="index">
          <router-link
            :class="['flex items-center gap-3', locale === 'fa' ? '!flex-row-reverse' : '']"
            :to="router.path"
          >
            <component :is="router.meta.icon" />
            {{ $t(router.name) }}
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="dark:!bg-zinc-700" :style="{ order: contentOrder }">
      <a-layout-header
        class="text-base md:text-2xl text-center !bg-white dark:!bg-zinc-500 p-0 h-16"
        :title="$t('AppBar')"
      >
        <h2>{{ $t('AppBar') }}</h2>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div class="p-6 !bg-white dark:!bg-zinc-700" :style="{ minHeight: 'calc(100vh - 112px)' }">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { routes } from '@/router'

const { locale } = useI18n()

const findRouter = routes.find((router) => router.meta.isSideBar)
const filterRouter = findRouter?.children?.filter((router) => router.meta.isSideBar) || []

const siderOrder = computed(() => (locale.value === 'fa' ? 1 : 0))
const contentOrder = computed(() => (locale.value === 'fa' ? 0 : 1))
</script>


<style>
</style>
