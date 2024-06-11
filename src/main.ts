import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import Antd from 'ant-design-vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import translate from './locale'

const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'en',
  messages: translate
})

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(i18n)
app.mount('#app')
