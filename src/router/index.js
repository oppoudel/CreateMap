import Vue from 'vue'
import Router from 'vue-router'
import Layers from '@/components/Layers'
import Map from '@/components/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layers
    },
    {
      path: '/map',
      component: Map,
      name: 'map'
    }
  ],
  mode: 'history'
})
