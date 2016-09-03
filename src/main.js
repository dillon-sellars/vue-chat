/* eslint-disable no-new */
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './store'

Vue.directive('scroll-bottom', function(el, binding) {
  console.info('scroll for ', el)
  Vue.nextTick(() => {
    console.info('nextTick scroll for ', el)
    el.scrollTop = el.scrollHeight - el.clientHeight
  })
})

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {App},
})

console.info('Launched Vue')
