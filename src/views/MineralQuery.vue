<template>
<v-card>
  <div class="map-container" ref="map"></div>
  <div class="map-overlay">
    <v-select v-model="mapStyle" :items="mapStyles" item-text="label" item-value="value" label="Select map style"></v-select>
    <v-text-field label="Label" prepend-icon="mdi-vuetify"></v-text-field>
  </div>

  <div class="search-container">
    <v-text-field label="Search..."></v-text-field>
  </div>
</v-card>
</template>

<script>
import mapboxgl from "mapbox-gl"
export default{
  data () {
    return {
      map: null,
      mapStyles: [
        { label: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
        { label: "Satellite", value: "mapbox://styles/mapbox/satellite-v9" },
        { label: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
        {
          label: "天地图",
          value:
            "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=ce6c110706b934f7f8e25ff19e61850a",
          type: "wmts"
        },
        {
          label: "Google Maps",
          value: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
          type: "xyz"
        },
        {
          label: "OpenStreetMap",
          value: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          type: "xyz"
        }
      ],
      mapStyle: "mapbox://styles/mapbox/streets-v11"
    }
  },
  mounted () {
    this.initializeMap()
  },
  methods: {
    initializeMap () {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibGlmZW5nMTExIiwiYSI6ImNsZ201Z2tnMzAyaGYzcnAzcXN1NTU5c3IifQ.iSuM-U4bOnTlKApmXsXSig"
      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: this.mapStyle,
        center: [121.47, 31.23],
        zoom: 12
      })
    }
  },
  watch: {
    mapStyle (newStyle) {
      const selectedStyle = this.mapStyles.find((style) => style.value === newStyle)
      if (selectedStyle.type === "wmts") {
        this.map.setStyle({
          version: 8,
          sources: {
            "raster-tiles": {
              type: "raster",
              tiles: [selectedStyle.value],
              tileSize: 256
            }
          },
          layers: [
            {
              id: "simple-tiles",
              type: "raster",
              source: "raster-tiles",
              minzoom: 0,
              maxzoom: 22
            }
          ]
        })
      } else if (selectedStyle.type === "xyz") {
        this.map.setStyle({
          version: 8,
          sources: {
            "raster-tiles": {
              type: "raster",
              tiles: [selectedStyle.value],
              tileSize: 256
            }
          },
          layers: [
            {
              id: "simple-tiles",
              type: "raster",
              source: "raster-tiles",
              minzoom: 0,
              maxzoom: 22
            }
          ]
        })
      } else {
        this.map.setStyle(newStyle)
      }
    }
  }
}
</script>
