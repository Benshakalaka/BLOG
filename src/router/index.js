import Vue from 'vue'
import Router from 'vue-router'

import TestWrapper from '../view/test/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      component: TestWrapper,
      name: 'test-container'
    }
  ]
})
