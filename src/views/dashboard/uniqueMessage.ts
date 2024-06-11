import { useI18n } from 'vue-i18n'

export const greetingToUser = (): string => {
  const { t } = useI18n()
  const currentHour = new Date().getHours()

  if (currentHour < 12) {
    return t('morning')
  } else if (currentHour < 18) {
    return t('afternoon')
  } else {
    return t('night')
  }
}
