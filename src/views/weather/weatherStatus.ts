import { useI18n } from 'vue-i18n'
export const getWeatherDescription = (weatherCode: number): string => {
  const { t } = useI18n()
  switch (weatherCode) {
    case 0:
      return t('weather_clearSky')
    case 1:
    case 2:
    case 3:
      return t('weather_partyCloudy')
    case 45:
    case 48:
      return t('weather_foggy')
    case 51:
    case 53:
    case 55:
      return t('weather_drizzle')
    case 61:
    case 63:
    case 65:
      return t('weather_rainy')
    case 80:
    case 81:
    case 82:
      return t('weather_showers')
    case 95:
    case 96:
    case 99:
      return t('weather_Thunderstorm')
    default:
      return 'Unknown weather'
  }
}
