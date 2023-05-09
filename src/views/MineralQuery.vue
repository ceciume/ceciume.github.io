<template>
  <div>
    <v-card class="map-container">
      <!-- 搜索栏 -->

      <div class="search-container">
        <v-text-field v-if="!showAdvancedSearch"
                      clearable
                      variant="solo-filled"
                      class="search-field"
                      v-model="searchText"
                      label="搜索"
                      @keyup.enter="search">
          <template v-slot:append-inner>
            <v-icon @click="showAdvancedSearch=true">mdi-dots-vertical</v-icon>
          </template>
        </v-text-field>
        <!-- 高级搜索框 -->
        <div v-else
             v-click-outside="closeAdvancedSearch">
          <v-card class="advanced-card">
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="矿区名称"
                                v-model="mineName"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select label="矿床类型"
                            v-model="type"
                            :items="typeOptions"></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="国家名称）"
                                v-model="country"
                                type="country"></v-text-field>
                </v-col>
                <v-col cols="12"
                       class="text-right">
                  <v-btn color="primary"
                         class="btn-spacing"
                         @click="search">搜索</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <!-- 图层选择器 -->

      <!-- 地图控件 -->
      <div ref="map"
           class="map"></div>
      <!-- 地点描述卡片 -->
      <v-card class="des-card"
              v-if="selectedPlace">
        <v-card-title>{{ selectedPlace?.title }}</v-card-title>
        <v-img :src="selectedPlace?.imageSrc"
               height="100px"></v-img>

        <v-card-text>{{ selectedPlace.description }}
          <div v-if="selectedPlace.relatedLinks">
            相关链接：
            <v-btn v-for="(link, index) in selectedPlace.relatedLinks.slice(0, 3)"
                   :key="index"
                   text
                   small
                   :href="link.url"
                   target="_blank">
              {{ link.title }}
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text
                 :href="selectedPlace.link"
                 target="_blank">了解更多</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl"
export default {
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
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      searchText: '',
      showAdvancedSearch: false,
      type: '',
      typeOptions: [
        '花岗岩',
        '火山岩',
        '砂岩',
        '碳硅泥'
      ],
      country: '',
      mineName: '',
      places: [
        {
          name: '帕劳群岛',
          imageSrc: "https://picsum.photos/id/1021/200",
          location: {
            lat: 7.51498,
            lng: 134.58252
          },
          description: '位于太平洋中部的热带天堂，拥有美丽的珊瑚礁和海滩。',
          link: 'https://zh.wikipedia.org/wiki/%E5%B8%95%E5%8A%B3%E7%BE%A4%E5%B2%9B'
          , relatedLinks: []
        },
        {
          name: '埃菲尔铁塔',
          imageSrc: "https://picsum.photos/id/1021/200",
          location: {
            lat: 48.85837,
            lng: 2.29448
          },
          description: '位于法国巴黎市的地标性建筑，高324米，是法国最著名的旅游景点之一。',
          link: 'https://zh.wikipedia.org/wiki/%E5%9F%83%E8%8F%B2%E5%B0%94%E9%93%81%E5%A1%94'
          , relatedLinks: []
        },
        {
          name: '金门大桥',
          imageSrc: "https://picsum.photos/id/1021/200",
          location: {
            lat: 37.81993,
            lng: -122.47852
          },
          description: '位于美国加利福尼亚州旧金山湾区，是世界上最长的悬索桥之一。',
          link: 'https://zh.wikipedia.org/wiki/%E9%87%91%E9%96%80%E5%A4%A7%E6%A9%8B'
          , relatedLinks: []
        },
        {
          name: '普罗旺斯',
          imageSrc: "https://picsum.photos/id/1021/200",
          location: {
            lat: 43.94819,
            lng: 4.80506
          },
          description: '法国南部地区，以其美丽的薰衣草田和酒庄而闻名。',
          link: 'https://zh.wikipedia.org/wiki/%E6%99%AE%E7%BD%97%E6%97%BA%E6%96%AF'
          , relatedLinks: []
        },
        {
          name: '乞力马扎罗山',
          imageSrc: "https://picsum.photos/id/1021/200",
          location: {
            lat: -3.06742,
            lng: 37.35563
          },
          description: '坐落于坦桑尼亚的山脉，是非洲最高峰，同时也是世界七大高峰之一。',
          link: 'https://zh.wikipedia.org/wiki/%E4%B9%9E%E5%8A%9B%E9%A9%AC%E6%89%8E%E7%BD%97%E5%B1%B1'
          , relatedLinks: []
        },
        {
          name: "玄武湖",
          imageSrc: "https://picsum.photos/id/1018/200",
          location: {
            lat: 32.065,
            lng: 118.803
          },
          description: "玄武湖位于南京市中心，是南京市著名的风景区和旅游景点。",
          link: "https://zh.wikipedia.org/wiki/%E7%8E%84%E6%AD%A6%E6%B9%96"
          , relatedLinks: []
        },
        {
          name: "苏州园林",
          imageSrc: "https://picsum.photos/id/1019/200",
          location: {
            lat: 31.299,
            lng: 120.585
          },
          description: "苏州园林，是中国苏州市的园林文化遗产。苏州园林是苏州园林文化的代表，是江南园林的瑰宝。",
          link: "https://zh.wikipedia.org/wiki/%E8%8B%8F%E5%B7%9E%E5%9B%AD%E6%9E%97",
          relatedLinks: [{
            title: '维基百科',
            url: 'https://zh.wikipedia.org/wiki/%E5%9F%83%E8%8F%B2%E5%B0%94%E9%93%81%E5%A1%94',
          },
          {
            title: '官方网站',
            url: 'https://www.toureiffel.paris/',
          },]
        },
        {
          name: "黄山",
          imageSrc: "https://picsum.photos/id/1020/200",
          location: {
            lat: 30.131,
            lng: 118.168
          },
          description: "黄山位于安徽省南部，是中国著名的风景区、文化区、世界文化与自然遗产。",
          link: "https://zh.wikipedia.org/wiki/%E9%BB%84%E5%B1%B1"
          , relatedLinks: []
        },
        {
          name: "泰山",
          imageSrc: "https://picsum.photos/id/1021/200",
          location: {
            lat: 36.201,
            lng: 117.129
          },
          description: "泰山位于中国山东省泰安市境内，是中国著名的名山之一，素有五岳之首的美誉。",
          link: "https://zh.wikipedia.org/wiki/%E6%B3%B0%E5%B1%B1"
          , relatedLinks: []
        },
        {
          name: "故宫",
          imageSrc: "https://picsum.photos/id/1022/200",
          location: {
            lat: 39.916,
            lng: 116.397
          },
          description: "故宫是明清两代的皇宫，位于中国北京市中心的故宫广场上，是中国明清两代的宫廷建筑群，也是世界上现存规模最大、保存最完整的木质结构古建筑之一。",
          link: "https://zh.wikipedia.org/wiki/%E6%95%85%E5%AE%AB"
          , relatedLinks: []
        }

      ],
    }
  },
  mounted () {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGlmZW5nMTExIiwiYSI6ImNsZ201Z2tnMzAyaGYzcnAzcXN1NTU5c3IifQ.iSuM-U4bOnTlKApmXsXSig"
    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: this.mapStyle,
      center: [121.47, 31.23],
      zoom: 12
    })

    // 为每个点添加唯一的 ID
    const features = this.places.map((place, index) => {
      return {
        id: index,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [place.location.lng, place.location.lat]
        },
        properties: {
          title: place.name,
          icon: 'marker',
          description: place.description,
          link: place.link,
          imageSrc: place.imageSrc,
          relatedLinks: place.relatedLinks
        }
      };
    });

    // 添加图层
    this.map.on('load', () => {
      this.map.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      });

      this.map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': '{icon}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });

      // 注册 click 事件处理程序
      this.map.on('click', 'places', (e) => {
        // 获取当前点击位置的要素
        const features = this.map.queryRenderedFeatures(e.point);
        // 检查 e.features 数组的长度
        if (features.length === 0) {
          // 如果 e.features 数组的长度为 0，将 selectedPlace 变量的值设置为 null
          this.selectedPlace = null;
        } else {
          // 否则，获取被单击的要素
          const feature = e.features[0];
          console.log(feature.properties);
          this.selectedPlace = feature.properties;
        }
      });

      // 将鼠标指针设置为手型，以表明可点击
      this.map.on('mouseenter', 'places', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      // 将鼠标指针恢复为默认值
      this.map.on('mouseleave', 'places', () => {
        this.map.getCanvas().style.cursor = '';
      });
    });



  },
  methods: {
    search () {
      // 在这里执行搜索操作
      console.log('搜索:', this.searchText);
    },
    closeAdvancedSearch (event) {
      if (!event.target.closest('.v-menu__content')) {
        this.showAdvancedSearch = false;
      }
    },

  },
  watch: {

  }
}
</script>
<style scoped>
.map-container {
  height: 90vh;
  width: 100vw;
}
.map {
  height: 90vh;
  width: 100vw;
}
.search-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  opacity: 0.9;
  width: 350px;
  border-radius: 10px;
}
/* 高级搜索 */
.advanced-card {
  background-color: #e8e8e8;
}
.marker {
  border-radius: 50%;
  border: 2px solid #fff;
  cursor: pointer;
}
.des-card {
  position: absolute;
  bottom: 30px;
  right: 50px;
  z-index: 1;
  opacity: 0.9;
  width: 350px;
  border-radius: 10px;
}
/* 图层选择器 */
.layer-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background-color: #d9d8d8;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
}
</style>