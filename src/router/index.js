import Vue from 'vue'
import Router from 'vue-router'
import Layers from '@/components/Layers'
import 'bulma/css/bulma.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layers
    }
  ]
})
