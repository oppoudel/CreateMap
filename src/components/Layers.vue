<template>
  <div class='container'> 
    <nav class="nav">
      <div class="nav-center">
        <a class="nav-item">
          <h1 class='title is-1'>Create Map</h1>
        </a>
      </div>
    </nav>
    <table class="table is-bordered">
      <tfoot>
        <tr v-for='layer in allLayers'>
          <th>{{layer.title}}</th>
          <td  v-if='!layer.selected'><button class="button is-primary" v-on:click="selectLayer(layer)">Add </button></td>
          <td v-else><button class="button is-danger" v-on:click="deSelectLayer(layer)">Remove</button></td>
        </tr>
      </tfoot>
    </table>
   <button class='button is-large is-info' :disabled="selectedLayers.length < 1">Create Map </button>
  </div>
</template>
<script>
import config from '@/config/config'
import axios from 'axios'
export default {
  data () {
    return {
      allLayers: [],
      selectedLayers: []
    }
  },
  methods: {
    selectLayer (layer) {
      layer.selected = true
      const selected = {
        id: layer.id,
        title: layer.title,
        selected: true
      }
      this.selectedLayers.push(selected)
    },
    deSelectLayer (layer) {
      layer.selected = false
      this.selectedLayers.splice(this.selectedLayers.indexOf(layer), 1)
    }
  },
  created () {
    axios.get(config.getUrl())
      .then(response => {
        const layers = response.data.results
        layers.map(layer => {
          this.allLayers.push({
            id: layer.id,
            title: layer.title,
            selected: false
          })
        })
      })
      .catch(
      error => console.log(error)
      )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button{
  min-width: 100px;
}
</style>
