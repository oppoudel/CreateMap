import config from '@/config/config'
export const createMap = function (loader, router) {
  const esriLoader = loader
  esriLoader.dojoRequire([
    'esri/core/urlUtils',
    'esri/core/watchUtils',
    'esri/views/MapView',
    'esri/Map',
    'esri/layers/VectorTileLayer',
    'esri/layers/Layer',
    'esri/widgets/Expand',
    'esri/widgets/Legend',
    'esri/widgets/LayerList',
    'esri/widgets/Search'
  ], (urlUtils, watchUtils, MapView, Map, VectorTileLayer, Layer, Expand, Legend, LayerList, Search) => {
    const urlObject = urlUtils.urlToObject(window.location.href)
    const center = (urlObject.query.center.split(',')).map(element => parseFloat(element))
    const ids = (urlObject.query.ids.split(','))
    const zoom = urlObject.query.zoom
    const map = new Map()
    const tileLyr = new VectorTileLayer({
      url: config.tileLayerURL
    })
    map.add(tileLyr)
    const view = new MapView({
      map: map,
      container: 'viewDiv',
      zoom: zoom,
      center: center
    })
    ids.forEach(function (id) {
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
    watchUtils.whenTrue(view, 'stationary', () => {
      let center = [view.center.longitude.toFixed(3), view.center.latitude.toFixed(3)].toString()
      let zoom = view.zoom
      router.push({name: 'map', query: {zoom: zoom, ids: ids.join(','), center: center}})
    })
  })
}
