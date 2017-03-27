<template>
  <tr>
    <th>{{layerInfo.title}}</th>
    <td  v-if='!layerInfo.selected'><button class="button is-primary" @click="selectLayer(layerInfo.id)">Add </button></td>
    <td v-else><button class="button is-danger" @click="deSelectLayer(layerInfo.id)">Remove</button></td>
  </tr>
</template>
<script>
  export default {
    props: ['layerInfo'],
    methods: {
      selectLayer (layerId) {
        return this.$store.commit('SELECT_LAYER', layerId)
      },
      deSelectLayer (layerId) {
        return this.$store.commit('DESELECT_LAYER', layerId)
      }
    }
  }
</script>
<style scoped>
.button{
  min-width: 100px;
}
tr>td {
  text-align: center;
}
</style>
