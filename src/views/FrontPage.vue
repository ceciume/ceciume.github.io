<template>
  <v-app>

    <v-container>
      <v-carousel>
        <v-carousel-item v-for="image in images"
                         :key="image.src">
          <v-img :src="image.src"
                 :alt="image.alt"></v-img>
        </v-carousel-item>
      </v-carousel>
      <p>我们共有 {{ dataCount }} 条样本数据。</p>
      <h2>相关数据分享平台链接</h2>

      <v-list v-if="links">

        <v-list-item v-for="link in links"
                     :key="link.url">
          <v-list-item-content>
            <v-list-item-title>
              <v-btn text
                     :href="link.url"
                     color="primary">{{ link.text }}</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-container>
    <v-row class="contact-information">
      <v-col cols="6">
        <div>地址：北京市</div>
        <div>电话：+86 0104505871</div>
        <div>Email：llll@example.com</div>
      </v-col>
      <v-col cols="6">
        <div>中国资源卫星应用中心</div>
        <div>  Copyright © 2023 lnc. All rights reserved.</div>
        <div>京G网安备11040102000094号 京ICP备05064415号</div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      images: [
        { src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg", alt: 'Image 1' },
        { src: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg", alt: 'Image 2' },
        { src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg", alt: 'Image 3' },
      ],
      dataCount: 1000,
      links: [
        { url: 'http://58.48.42.237/luojiaSet/user/login?redirect=%2F', text: 'LuojiaSet遥感数据分享平台' },
        { url: 'hhttps://mlhub.earth/', text: 'Radiant MLHub' },
        { url: 'https://vuetifyjs.com/en/', text: 'vuetify' },
      ],
    }
  },
})
</script>
<style scoped>
.contact-information{
  color: #c9d0dd;
  background-color: #14263b;

}

</style>
