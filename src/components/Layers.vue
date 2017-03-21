<template>
  <div class='container'>
    <nav class="nav">
      <div class="nav-center">
        <a class="nav-item">
          <h1 class='title is-1'>Create Map</h1>
        </a>
      </div>
    </nav>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <p class="control has-icon has-icon-right">
          <input type="text" class="input is-large" placeholder="Find a Layer" v-model="filterQuery">
          <span class="icon is-medium">
            <i class="fa fa-search"></i>
          </span>
        </p>
      </div>
    </div>
    <table class="table is-bordered">
      <tfoot>
        <app-layer v-for='layer in displayedLayers' :key='layer.id' :layerInfo='layer'></app-layer>
      </tfoot>
    </table>
   <router-link to="/map" tag="button" class='button is-large is-info' :disabled="!selectedLayers.length" exact>Create Map</router-link>
  </div>
</template>
<script>
import Layer from './Layer'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      filterQuery: ''
    }
  },
  components: {
    'app-layer': Layer
  },
  computed: {
    ...mapGetters({
      allLayers: 'getAllLayers',
      selectedLayers: 'getSelectedLayers'
    }),
    displayedLayers () {
      const allLayers = this.allLayers
      const filteredLayers = allLayers.filter(this.filterLayer)
      return filteredLayers
    }
  },
  created () {
    this.$store.dispatch('loadLayers')
  },
  methods: {
    filterLayer (layer) {
      const strTags = layer.tags.join(' ').toLowerCase()
      const lowercaseName = layer.title.toLowerCase()
      const selection = strTags + lowercaseName
      const lowercaseQuery = this.filterQuery.toLowerCase()
      return selection.indexOf(lowercaseQuery) > -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button{
  min-width: 100px;
}
</style>
