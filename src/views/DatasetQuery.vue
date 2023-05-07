<template>
  <div>
    <!--地图控件-->
    <v-card class="map-container">
      <div ref="map"
           class="map"></div>
      <div class="map-overlay">
        <v-select v-model="mapStyle"
                  :items="mapStyles"
                  item-text="label"
                  item-value="value"
                  label="Select map style"></v-select>
      </div>
    </v-card>

    <!--间隔-->
    <v-spacer></v-spacer>
    <v-card class="card">
      <div class="container">
        <!-- 输入框搜索 -->
        <div class="search-container">
          <v-text-field class="search-box"
                        v-model="searchTerm"
                        label="搜索"
                        outlined></v-text-field>
        </div>

        <!-- 标签搜索 -->
        <div class="tags-container">
          <v-chip v-for="(tag, index) in tags"
                  :key="index"
                  :input-value="selectedTags.includes(tag)"
                  @click="toggleTag(tag)"
                  :color="tagColor(tag)">
            {{ tag }}
          </v-chip>
        </div>
      </div>
    </v-card>
    <v-spacer></v-spacer>
    <!-- 数据集列表 -->
    <v-card v-for="(item, index) in filteredItems"
            :key="index"
            class="dataset-card"
            @click="goToDatasetDetail(item.id,item.title)">
      <template v-slot:header>
        <h3>{{ item.title }}</h3>
      </template>
      <div>
        <p>{{ item.description }}</p>
        <p>{{ item.tags }}</p>
      </div>
    </v-card>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"


export default {
  data () {
    return {
      map: null,
      searchTerm: "",
      selectedTags: [],
      tags: ["tag1", "tag2", "tag3"],
      items: [
        { title: "矿区 1", description: "Description 1", tags: ["tag1", "tag2"], id: 1 },
        { title: "矿区 2", description: "Description 2", tags: ["tag2", "tag3"], id: 2 },
        { title: "矿区3", description: "Description 3", tags: ["tag3", "tag1"], id: 3 },
        { title: "矿区a", description: "你好", tags: ["tag1", "tag2"], id: 4 },
        { title: "矿区sdf", description: "士大夫", tags: ["tag2", "tag3"], id: 5 },
        { title: "矿区asdaf", description: "得浑身发抖", tags: ["tag3", "tag1"], id: 6 },
        { title: "kuangquasd", description: "asfd", tags: ["tag1", "tag2"], id: 7 },
        { title: "sd", description: "adsf", tags: ["tag2", "tag3"], id: 8 },
        { title: "ky", description: "Dd", tags: ["tag3", "tag1"], id: 9 }
      ],
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      mapStyles: [
        { label: "Streets", value: "mapbox://styles/mapbox/streets-v11" },
        { label: "Satellite", value: "mapbox://styles/mapbox/satellite-v9" },
        { label: "Dark", value: "mapbox://styles/mapbox/dark-v10" },
        {
          label: "Tianditu",
          value: "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=a7ffd61a971ab4563ac9462dcab956fd"
        }
      ]
    }
  },
  computed: {
    // 搜索逻辑
    filteredItems () {
      const regex = new RegExp(this.searchTerm, "i")
      return this.items.filter(item => {
        const matchesSearchTerm = regex.test(item.title) || regex.test(item.description)
        const matchesSelectedTags = this.selectedTags.length === 0 || this.selectedTags.some(tag => item.tags.includes(tag))
        return matchesSearchTerm && matchesSelectedTags
      })
    },
    tagColor () {
      return tag => this.selectedTags.includes(tag) ? '#0b5fbf' : '';
    }
  },
  name: "DatasetQuery",
  // 组件逻辑和数据处理
  mounted () {
    this.initMap()
  },
  watch: {
    mapStyle (newStyle) {
      this.map.setStyle(newStyle)
    }
  },
  methods: {
    // 根据卡片跳转到指定详情页面
    goToDatasetDetail (id, title) {
      this.$router.push({
        path: "/datasetDetail",
        query: { id, title }
      })
    },
    // 标签选中
    toggleTag (tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter((t) => t !== tag)
      } else {
        this.selectedTags.push(tag)
      }
    },
    // 初始化地图
    initMap () {
      mapboxgl.accessToken = "pk.eyJ1IjoibGlmZW5nMTExIiwiYSI6ImNsZ201Z2tnMzAyaGYzcnAzcXN1NTU5c3IifQ.iSuM-U4bOnTlKApmXsXSig"
      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/satellite-v9", // 设置为遥感影像样式
        center: [114, 30],
        zoom: 9
      })

      this.map.addControl(new mapboxgl.ScaleControl(), "bottom-left")
    }

  }

}

</script>

  <style scoped>
/* 样式 */

/* 地图容器的样式 */
.map-container {
  position: relative;
  margin: 0 auto;
  width: 80%;
  border-radius: 10px;
}

.map {
  height: 400px;
}
.map-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
}

/* 搜索栏 */
.search-box {
  color: #1a2027;

  width: 200px;
}
.card {
  margin: 0 auto;
  width: 80%;
  background-color: transparent;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
}
.card:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.container {
  display: flex;
  align-items: center;
}

.tag {
  display: inline-block;
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.tag.active {
  background-color: #0b5fbf;
}
.tags-container {
  flex-basis: 60%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tags-container > .v-chip {
  margin: 4px;
}
/* 数据集卡片 */
.dataset-card {
  border: 1px solid #ccc;
  padding: 10px;
  width: 80%;
  margin-bottom: 20px;
  border-radius: 10px;
  margin: auto;
  margin-top: 10px;
}
</style>

