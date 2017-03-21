<template>
  <div>
    <router-link to="/" id="home" class="title">Home</router-link>
    <div id="viewDiv" class="balt-theme">This is a Map</div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  data () {
    return {
      ids: []
    }
  },
  computed: {
    selectedLayers () {
      return this.$store.getters.getSelectedLayers
    },
    createMap () {
      esriLoader.dojoRequire(['esri/views/MapView',
        'esri/Map',
        'esri/layers/Layer',
        'esri/widgets/Expand',
        'esri/widgets/Legend',
        'esri/widgets/LayerList',
        'esri/widgets/Search'
      ], (MapView, Map, Layer, Expand, Legend, LayerList, Search) => {
        const map = new Map({
          basemap: 'topo'
        })
        const view = new MapView({
          map: map,
          container: 'viewDiv',
          zoom: 12,
          center: [-76.6152, 39.28945]
        })
        this.selectedLayers.forEach((element) => {
          this.ids.push(element.id)
        })
        this.ids.forEach(function (id) {
          Layer.fromPortalItem({
            portalItem: {
              id: id
            }
          }).then(function (layer) {
            map.add(layer)
          })
        })
        view.then(() => {
          const legend = new Legend({
            view: view,
            container: document.createElement('div')
          })
          const layerList = new LayerList({
            view: view,
            container: document.createElement('div')
          })
          const legendExpand = new Expand({
            view: view,
            content: legend.domNode,
            expandIconClass: 'esri-icon-collection',
            expandTooltip: 'Legend'
          })
          const layersExpand = new Expand({
            view: view,
            content: layerList.domNode,
            expandIconClass: 'esri-icon-layer-list',
            expandTooltip: 'Layers'
          })
          view.ui.add(layersExpand, 'top-right')
          view.ui.add(legendExpand, 'top-right')
        })
        const searchWidget = new Search({
          view: view
        })
        view.ui.add(searchWidget, {
          position: 'top-left',
          index: 0
        })
      })
    }
  },
  mounted () {
    if (!esriLoader.isLoaded()) {
      esriLoader.bootstrap((err) => {
        if (err) {
          console.error(err)
        }
        this.createMap()
      }, {
        url: 'https://js.arcgis.com/4.3/'
      })
    } else {
      this.createMap()
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
