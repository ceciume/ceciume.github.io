<template>
  <v-container>
    <v-img src="https://th.bing.com/th/id/R.b66bc8bb9ee14d1a5784f4569010c311?rik=pGp6eGs64I0a%2fQ&pid=ImgRaw&r=0"></v-img>
    <v-row justify="center">
      <v-col cols="12"
             sm="8"
             md="4">
        <v-card>
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username"
                            label="用户名"
                            :rules="[rules.required]"></v-text-field>
              <v-text-field v-model="password"
                            label="密码"
                            type="password"
                            :rules="[rules.required]"></v-text-field>
              <v-btn type="submit"
                     color="primary"
                     class="mr-4"
                     :loading="loading">Login</v-btn>
              <v-btn color="secondary"
                     @click="reset">Reset</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import md5 from 'md5'
// import axios from 'axios';

export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      rules: {
        required: value => !!value || '必填项',
      },
    }
  },
  methods: {
    // login () {
    //   this.loading = true
    //   setTimeout(() => {
    //     const hashedPassword = md5(this.password)
    //     const user = {
    //       username: this.username,
    //       password: hashedPassword
    //     }
    //     localStorage.setItem('user', JSON.stringify(user))
    //     this.$router.push('/home')
    //   }, 1000)
    // },
    async login () {
      try {
        this.loading = true;
        this.$router.push('/U-login');
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        // 前端测试先让他无密码登录
        // this.loading = true;
        // this.$router.push('/U-login');
      }
    },
    reset () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
