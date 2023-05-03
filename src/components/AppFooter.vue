<template>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="center"
           no-gutters>
      <v-btn v-for="link in links"
             :key="link"
             color="white"
             variant="text"
             class="mx-2"
             rounded="xl">
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4"
             cols="12">
        Copyright
        <img src="src\assets\iconfont\copyright.png"
             width="13"
             alt="My Image" />
        {{ new Date().getFullYear() }} 北京地质研究所
      </v-col>
    </v-row>
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
  }
}
</script>