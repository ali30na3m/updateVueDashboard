<template>
  <div class="flex flex-col items-center justify-center gap-5 p-4">
    <Input
      v-model:value="username"
      :placeholder="$t('username')"
      class="w-full sm:w-[calc(100%-200px)] md:w-[200px] dark:bg-zinc-800 dark:child:bg-zinc-800 dark:child:text-white"
      @keyup.enter="submitHandler"
    >
      <template #prefix>
        <UserOutlined />
      </template>
      <template #suffix>
        <a-tooltip class="dark:child:text-white" :title="$t('tooltipEditUser')">
          <InfoCircleOutlined />
        </a-tooltip>
      </template>
    </Input>
    <a-select
      v-model:value="valueTheme"
      show-search
      :placeholder="$t('selectTheme')"
      class="w-full sm:w-[calc(100%-200px)] md:w-[200px] dark:child:text-white"
      :options="themeOptions"
    ></a-select>
    <a-select
      v-model:value="valueLang"
      class="w-full sm:w-[calc(100%-200px)] md:w-[200px] dark:child:text-white"
      show-search
      :placeholder="$t('selectLang')"
      :options="langOptions"
    ></a-select>
    <a-button type="primary" :disabled="isSubmitDisabled" @click="submitHandler">
      {{ $t('submit') }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import { Input } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { onMounted, ref, computed } from 'vue'
import { notify } from '@/utils'

const { t, locale } = useI18n()

const username = ref<string>('')
const valueTheme = ref<string>('light')
const valueLang = ref<string>('en')

const isSubmitDisabled = computed(() => !username.value || username.value.trim().length < 4)
const themeOptions = computed(() => [
  { value: 'light', label: t('light') },
  { value: 'dark', label: t('dark') }
])
const langOptions = computed(() => [
  { value: 'en', label: t('English') },
  { value: 'fa', label: t('Persian') }
])
const submitHandler = () => {
  const previousTheme = localStorage.getItem('theme')
  const previousLang = localStorage.getItem('lang')
  const previousUsername = localStorage.getItem('username')

  localStorage.setItem('theme', valueTheme.value)
  localStorage.setItem('lang', valueLang.value)
  localStorage.setItem('username', username.value || '')
  locale.value = valueLang.value

  document.documentElement.classList.toggle('dark', valueTheme.value === 'dark')

  if (
    previousTheme === valueTheme.value &&
    previousLang === valueLang.value &&
    previousUsername === username.value
  ) {
    notify('warning', t('noChangesModal'))
  } else {
    notify('success', t('successModal'), t('successEdit'))
  }
}

onMounted(() => {
  valueLang.value = localStorage.getItem('lang') || 'en'
  valueTheme.value = localStorage.getItem('theme') || 'light'
  username.value = localStorage.getItem('username') || ''
})
</script>