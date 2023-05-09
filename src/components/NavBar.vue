<template>
  <v-app-bar app
             color="#e5f4f9">
    <v-toolbar-title></v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/home"
                 class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\首页.png"
                  size="30"></v-avatar>
        首页
      </v-btn></router-link>
    <router-link to="/mineral-query"
                 class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\矿山.png"
                  size="30"></v-avatar>矿床查询</v-btn></router-link>
    <router-link to="/dataset-query"
                 class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\遥感卫星.png"
                  size="30"></v-avatar>查询</v-btn></router-link>
    <router-link to="/about-us"
                 class="my-link">
      <v-btn text>
        <v-avatar image="src\assets\iconfont\关于我们.png"
                  size="30"></v-avatar>关于我们
      </v-btn>
    </router-link>
    <router-link to="/order-list"
                 class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\订单列表.png"
                  size="30"></v-avatar>订单列表</v-btn></router-link>
    <router-link to="/order-review"
                 class="my-link"><v-btn text>
        <v-avatar image="src\assets\iconfont\订单审核.png"
                  size="30"></v-avatar>订单审核</v-btn></router-link>
    <router-link to="/user-tutorial"
                 class="my-link">
      <v-btn text>
        <v-avatar image="src\assets\iconfont\用户手册.png"
                  size="30"></v-avatar>用户手册</v-btn>
    </router-link>

    <v-spacer></v-spacer>
    <v-btn text
           @click="$router.push('/')">
      <img src="src\assets\iconfont\设置.png"
           width="24"
           alt="icon" />
    </v-btn>
    <v-avatar image="src\assets\iconfont\头像.png"
              size="30"
              @click="showMenu = !showMenu"></v-avatar>
    <div>
      <v-menu v-model="showMenu"
              class="person-menu"
              :close-on-content-click="false">
        <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>个人中心</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToOrders">
            <v-list-item-title>订单列表</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logOut">
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-dialog v-model="dialog"
              width="auto">
      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary"
                 block
                 @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  data () {
    return {
      showMenu: false,
      dialog: false,
    };
  },
  methods: {
    goToProfile () {
      // 跳转到个人中心页面的代码
      this.dialog = true;
    },
    goToOrders () {
      // 跳转到订单列表页面的代码
    },
    logOut () {
      // 退出登录的代码
      this.$router.push('/')
    }
  },

};
</script>
<style scoped>
.parent-element {
  position: relative;
}

.my-link {
  color: rgb(34, 34, 34); /* 字体颜色 */
  text-decoration: none; /* 取消下划线 */
}
.person-menu {
  position: absolute !important;
  top: 50px;
  left: 1310px;
}
</style>