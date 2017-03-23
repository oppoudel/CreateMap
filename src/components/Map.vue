<template>
  <div>
    <div id="viewDiv" class="balt-theme"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import { createMap } from './map'
export default {
  data () {
    return {
      ids: []
    }
  },
  computed: {
    selectedLayers () {
      return this.$store.getters.getSelectedLayers
    }
  },
  mounted () {
    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err)
        }
        createMap(esriLoader, this.$router)
      }, {
        url: 'https://js.arcgis.com/4.3/'
      })
    } else {
      createMap(esriLoader, this.$router)
    }
  }
}
</script>
<style>
  @import url('https://js.arcgis.com/4.3/esri/themes/light/main.css');
  #home {
    position: fixed;
    top : 30px;
    z-index: 10;
  }
  #viewDiv {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
