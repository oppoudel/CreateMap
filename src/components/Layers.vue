<template>
  <div>
    <nav class="nav hero is-default has-shadow">
      <div class='container'>
        <div class="nav-left">
          <div class="nav-item">
            <img src='../assets/CITY-LOGO.png' alt="Vue">
            <h1 class='title is-3'><strong>Create Map</strong></h1>
          </div>
        </div>
      </div>
    </nav>
    <div class='container'>
      <div class="columns">
        <div class="column is-three-quarters">
          <p class="control has-icon has-icon-right">
            <input type="text" class="input is-large" placeholder="Find a Layer" v-model="filterQuery">
            <span class="icon is-medium">
                <i class="fa fa-search"></i>
              </span>
          </p>
          <p class="help is-danger" v-if="selectedLayers.length > 5">Add upto 5 layers</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-three-quarters">
          <table class="table is-bordered">
            <tfoot>
              <app-layer v-for='layer in displayedLayers' :key='layer.id' :layerInfo='layer'></app-layer>
            </tfoot>
          </table>
        </div>
        <div>
          <router-link :to="{ name: 'map', query: {mapTitle: 'Give Your Map a Title', zoom: 12, ids: layerIds.join(','), center: '-76.615,39.289'}}" tag="button" class='button is-large is-info' :disabled="!selectedLayers.length || selectedLayers.length > 5" exact>Create Map</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Layer from './Layer'
import { mapGetters } from 'vuex'
export default {
  data() {
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
    displayedLayers() {
      const allLayers = this.allLayers
      const filteredLayers = allLayers.filter(this.filterLayer)
      return filteredLayers
    },
    layerIds() {
      let ids = []
      this.selectedLayers.forEach((element) => ids.push(element.id))
      return ids
    }
  },
  created() {
    this.$store.dispatch('loadLayers')
  },
  methods: {
    filterLayer(layer) {
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
.nav.is-default {
  background-color: #f5f5f5;
  margin-bottom: 2rem;
}

.nav-item img {
  max-height: 2.75rem;
}

h1 {
  margin-left: 1rem;
}

.help.is-danger {
  text-align: center;
}

.button.is-large {
  top: 20vh;
  margin-left: 3rem;
}

.button {
  min-width: 100px;
}
</style>
