<template>
  <v-footer class="footer">
    <div class="links"><v-btn v-for="link in links"
             :key="link.text"
             color=#1e293b
             variant="text"
             class="mx-2"
             rounded="xl"
             @click="goToLink(link.url)">
        {{ link.text }}
      </v-btn></div>
    <div class="copyright">
      Copyright
      <img src="src\assets\iconfont\copyright.png"
           width="13"
           alt="My Image" />
      {{ new Date().getFullYear() }} 北京地质研究所
    </div>

  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    links: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goToLink(url) {
      window.location.href = url;
    }
  }
}
</script>
<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  color: #656d76;
}

.links {
  display: flex;
}

.links v-btn {
  margin-right: 10px;
}

.copyright {
  display: flex;
  align-items: center;
}

.copyright img {
  margin-left: 10px;
}
</style>