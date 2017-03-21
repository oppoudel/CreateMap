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
          <td  v-if='!layer.selected'><button class="button is-primary" @click="selectLayer(layer.id)">Add </button></td>
          <td v-else><button class="button is-danger" @click="deSelectLayer(layer.id)">Remove</button></td>
        </tr>
      </tfoot>
    </table>
   <router-link to="/map" tag="button" class='button is-large is-info' :disabled="!selectedLayers.length" exact>Create Map</router-link>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: mapGetters({
    allLayers: 'getAllLayers',
    selectedLayers: 'getSelectedLayers'
  }),
  methods: {
    selectLayer (layerId) {
      return this.$store.commit('SELECT_LAYER', layerId)
    },
    deSelectLayer (layerId) {
      return this.$store.commit('DESELECT_LAYER', layerId)
    }
  },
  created () {
    this.$store.dispatch('loadLayers')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button{
  min-width: 100px;
}
</style>
