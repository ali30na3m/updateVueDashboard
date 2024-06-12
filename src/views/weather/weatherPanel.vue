<template>
  <div class="child:!flex child:!items-center child:!justify-center child:mx-auto">
    <a-select
      class="w-full sm:w-[200px] dark:child:text-white"
      v-model:value="citySelect"
      show-search
      :placeholder="$t('weatherSelect')"
      :options="options"
      :filter-option="filterOption"
      @change="handleChange"
    ></a-select>
    <div class="mt-4">
      <a-card
        :title="$t('cityInformation')"
        class="w-full sm:w-[200px] h-min dark:bg-zinc-800 dark:child:text-white text-center"
      >
        <p>{{ citySelect }}</p>
        <p>
          {{ weatherDetails?.current_weather.temperature
          }}{{ weatherDetails?.current_weather_units.temperature }}
        </p>
        <p>{{ weatherDescription }}</p>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { getApi } from '@/api'
import { getWeatherDescription } from './weatherStatus'
import weatherData from './data/ir.json'
import type { SelectProps } from 'ant-design-vue'
import type { WeatherTypeData, WeatherApi } from './type'

const citySelect = ref<string | null>(null)
const weathers = ref<WeatherTypeData[]>(weatherData)
const weatherDetails = ref<WeatherApi | null>(null)
const options = ref<SelectProps['options']>(
  weathers.value.map((weather) => {
    return { value: weather.city, label: weather.city }
  })
)
const handleChange = async (value: string) => {
  citySelect.value = value
  const cityDetails = weathers.value.find((weather) => weather.city === value)
  if (cityDetails) {
    await getApi(
      `forecast?latitude=${cityDetails.lat}&longitude=${cityDetails.lng}&current_weather=true`
    )
      .then((data: WeatherApi) => (weatherDetails.value = data))
      .catch(() => emptyText())
  }
}
const emptyText = () => {
  if (citySelect.value === null || weatherDetails.value === null) {
    citySelect.value = '...'
  }
}
const weatherDescription = computed(() => {
  if (weatherDetails.value) {
    return getWeatherDescription(weatherDetails.value.current_weather.weathercode)
  }
  return ''
})

const filterOption = (input: string, option: any) => {
  return option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
onMounted(() => {
  handleChange('Tehran')
})
</script>

<style scoped>
p {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: large;
  font-weight: 600;
}
</style>