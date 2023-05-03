<template>
<v-app-bar app color="#e5f4f9">
    <v-toolbar-title>U资源样本库</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="$emit('changeView', 'FrontPage')">
      <v-icon>home</v-icon>
      首页
    </v-btn>
    <v-btn text @click="$emit('changeView', 'MineralQuery')">矿床查询</v-btn>
    <v-btn text @click="$emit('changeView', 'DatasetQuery')">数据集查询</v-btn>
    <v-btn text @click="$emit('changeView', 'AboutUs')">关于我们</v-btn>
    <v-btn text @click="$emit('changeView', 'OrderList')">订单列表</v-btn>
    <v-btn text @click="$emit('changeView', 'OrderReview')">订单审核</v-btn>
    <v-btn text @click="$emit('changeView', 'UTutorial')">用户手册</v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="$router.push('/')">Logout</v-btn>
    <v-avatar image="src\assets\iconfont\头像.png" size="30"></v-avatar>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
