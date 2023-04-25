<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form>
          <v-text-field label="用户名"
                        v-model="username"></v-text-field>
          <v-text-field label="密码"
                        type="password"
                        v-model="password"></v-text-field>
          <v-btn color="primary"
                 @click="submitForm">
            登录
          </v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm () {
      // 处理表单提交事件
      console.log(this.username)
    },
  },
};
</script>