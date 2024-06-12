<template>
  <div
    :class="[
      'flex items-center justify-center flex-col gap-6 h-[100vh]',
      getTheme === 'dark' && 'bg-zinc-800 text-white'
    ]"
  >
    <h2 class="text-3xl">{{ $t('login') }}</h2>
    <a-form
      class="flex flex-col items-center justify-center"
      name="basic"
      autocomplete="off"
      @submit.prevent="clickHandler"
    >
      <a-form-item class="w-full md:w-[300px]" name="username">
        <Input :placeholder="$t('username')" v-model:value="username" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="isSubmitDisable">{{
          $t('submit')
        }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { Input } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const router = useRouter()
const getTheme = localStorage.getItem('theme')

const isSubmitDisable = computed(() => username.value.trim().length < 4)

const clickHandler = () => {
  if (username.value !== '') {
    localStorage.setItem('username', username.value)
    router.push('/dashboard')
  }
}
</script>
