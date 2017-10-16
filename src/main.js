/* eslint-disable no-new */

import Vue from 'vue'
import App from './VueChat'
import store from './store'

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {App},
})
