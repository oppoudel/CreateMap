<template>
  <div>
    <nav class="nav hero is-default has-shadow">
      <div class='container'>
        <div class="nav-left">
          <router-link to="/" class="nav-item">
            <img src='../assets/CITY-LOGO.png' alt="Vue">
          </router-link>
          <input class="title is-3" :value="routerQuery.mapTitle" @input="updateTitle($event.target.value)">
        </div>
      </div>
    </nav>
    <div id="viewDiv" class="balt-theme"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import { createMap } from './esrimap'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      mapTitle: 'Create Map'
    }
  },
  computed: mapGetters({
    selectedLayers: 'getSelectedLayers',
    routerQuery: 'getRouterQuery'
  }),
  methods: {
    updateTitle (value) {
      let title = value
      this.$router.push({name: 'map', query: {mapTitle: title, zoom: this.routerQuery.zoom, ids: this.routerQuery.ids, center: this.routerQuery.center}})
    }
  },
  mounted () {
    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err)
        }
        createMap(esriLoader, this.$router, this.routerQuery.mapTitle)
      }, {
        url: 'https://js.arcgis.com/4.3/'
      })
    } else {
      createMap(esriLoader, this.$router, this.routerQuery.mapTitle)
    }
  }
}
</script>
<style scoped>
  @import url('https://js.arcgis.com/4.3/esri/themes/light/main.css');
  .nav.is-default {
    background-color: #f5f5f5;
    margin-bottom: 2rem;
  }
  .nav-left{
    align-items: center;
  }
  .nav-item img {
      max-height: 2.75rem;
  }
  input {
    margin-left: 1rem;
    border: 0;
    background: transparent;
    font-weight: normal;
    width: 100%;
  }
  #home {
    position: fixed;
    top : 30px;
    z-index: 10;
  }
  #viewDiv {
    position: absolute;
    top: 3.5rem;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
