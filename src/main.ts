import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueVirtualScroller from 'vue-virtual-scroller'

createApp(App)
  .use(VueVirtualScroller)
  .mount('#app')
