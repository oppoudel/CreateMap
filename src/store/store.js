import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '@/config/config'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    allLayers: [],
    selectedLayers: []
  },
  getters: {
    getAllLayers: state => state.allLayers,
    getSelectedLayers: state => state.selectedLayers
  },
  actions: {
    loadLayers ({ commit }) {
      axios.get(config.getUrl())
        .then(response => {
          const layers = response.data.results
          commit('ADD_LAYERS', layers)
        })
        .catch(error => console.log(error))
    }
  },
  mutations: {
    ADD_LAYERS (state, layers) {
      if (!state.allLayers.length) {
        layers.map((layer) => {
          state.allLayers.push({
            id: layer.id,
            title: layer.title,
            tags: layer.tags,
            selected: false
          })
        })
      }
    },
    SELECT_LAYER (state, layerId) {
      const layer = state.allLayers.find(layer => {
        return layer.id === layerId
      })
      layer.selected = true
      const selected = {
        id: layer.id,
        title: layer.title,
        tags: layer.tags,
        selected: true
      }
      state.selectedLayers.push(selected)
    },
    DESELECT_LAYER (state, layerId) {
      const layer = state.allLayers.find(layer => {
        return layer.id === layerId
      })
      layer.selected = false
      const selected = state.selectedLayers.find(layer => {
        return layer.id === layerId
      })
      state.selectedLayers.splice(state.selectedLayers.indexOf(selected), 1)
    }
  }
})
