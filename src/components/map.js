export const createMap = function (loader, selectedLayers) {
  const esriLoader = loader
  let ids = []
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
    selectedLayers.forEach((element) => {
      ids.push(element.id)
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
  })
}
