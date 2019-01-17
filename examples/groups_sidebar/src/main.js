import Vue from 'vue'
import i18n from '../plugins/translation/i18n'
import App from './App.vue'

export default new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
