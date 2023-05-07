<template>
  <v-app-bar app
             color="#e5f4f9">
    <v-toolbar-title>U资源样本库</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/home" class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\首页.png"
                  size="30"></v-avatar>
        首页
      </v-btn></router-link>
    <router-link to="/mineral-query" class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\矿山.png"
                  size="30"></v-avatar>矿床查询</v-btn></router-link>
    <router-link to="/dataset-query" class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\遥感卫星.png"
                  size="30"></v-avatar>数据集查询</v-btn></router-link>
    <router-link to="/about-us" class="my-link">
      <v-btn text>
        <v-avatar image="src\assets\iconfont\关于我们.png"
                  size="30"></v-avatar>关于我们
      </v-btn>
    </router-link>
    <router-link to="/order-list" class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\订单列表.png"
                  size="30"></v-avatar>订单列表</v-btn></router-link>
    <router-link to="/order-review" class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\订单审核.png"
                  size="30"></v-avatar>订单审核</v-btn></router-link>
    <router-link to="/user-tutorial" class="my-link">
      <v-btn text>
        <v-avatar image="src\assets\iconfont\用户手册.png"
                  size="30"></v-avatar>用户手册</v-btn>
    </router-link>

    <v-spacer></v-spacer>
    <v-btn text
           @click="$router.push('/')">Logout</v-btn>
    <v-avatar image="src\assets\iconfont\头像.png"
              size="30"></v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
<style scoped>
.my-link {
  color: rgb(34, 34, 34); /* 字体颜色 */
  text-decoration: none; /* 取消下划线 */
}
</style>