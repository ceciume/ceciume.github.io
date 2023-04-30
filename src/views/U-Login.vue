<template>
  <v-container class="d-flex align-center fill-height">
    <v-row justify="center"
           class="d-flex justify-center">
      <v-col cols="12"
             sm="8"
             md="4">
        <v-card color="white"
                class="pa-3"
                elevation="8"
                rounded="lg">
          <v-card-title class="my-4 text-h4 text-center">
            <span class="flex-1"> Welcome </span>
          </v-card-title>
          <v-card-subtitle class="text-center">Sign in to your account</v-card-subtitle>
          <!-- 登录窗口-->

          <v-card-text>
            <v-form ref="refLoginForm"
                    class="text-left"
                    lazy-validation>
              <v-text-field ref="refUsername"
                            v-model="username"
                            required
                            clearable
                            :error="error"
                            label="用户名"
                            color="indigo"
                            density="default"
                            bg-color="#fff"
                            :rules="usernameRules"
                            name="username"
                            variant="solo"
                            validateOn="blur"
                            @keyup.enter="handleLogin"
                            @change="resetErrors">

              </v-text-field>
              <v-text-field ref="refPassword"
                            v-model="password"
                            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            label="密码"
                            :type="showPassword ? 'text' : 'password'"
                            :error="error"
                            :error-messages="errorMessage"
                            variant="solo"
                            density="default"
                            color="primary"
                            bg-color="#fff"
                            :rules="passwordRules"
                            name="password"
                            outlined
                            validateOn="blur"
                            @change="resetErrors"
                            @keyup.enter="handleLogin"
                            @click:append-inner="showPassword = !showPassword">

              </v-text-field>
              <vue-slide-unlock ref="slideUnlock"
                                :width="300"
                                :height="50"
                                :text="'请向右滑动解锁'"
                                :success-text="'解锁成功'"
                                @success="onSuccess" />
              <v-btn :disabled="isSignInDisabled"
                     block
                     size="x-large"
                     color="primary"
                     @click="handleLogin"
                     class="mt-2">登录</v-btn>
                    
            </v-form>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import VueSlideUnlock from 'vue-slide-unlock'
// import 'vue-slide-unlock/lib/vue-slide-unlock.css'
const router = useRouter()

const username = ref("admin");
const password = ref("123456");
const error = ref(false);
const isSignInDisabled = ref(false);
const errorMessage = ref("");
const refLoginForm = ref();
const isSlideUnlock = ref(false);
// show password field
const showPassword = ref(false);


const resetErrors = () => {
  error.value = false;
  errorMessage.value = "";
};
const onSuccess = () => {
  isSlideUnlock.value = true;
  console.log("1111")
  refreshPage();
};
// 验证
const usernameRules = [
  (v) => !!v || "用户名不能为空",
  (v) => v.length >= 3 || "用户名至少为三个字符",
];

const passwordRules = ref([
  (v) => !!v || "密码不能为空",
  (v) =>
    (v && v.length <= 10) || "密码少于10个字符",
  (v) => /^[a-zA-Z0-9]{6,16}$/.test(v) || "密码格式不正确",
]);

const refreshPage = () => {
  location.reload();
}


const handleLogin = async () => {

  if (isSlideUnlock.value) {
    try {

      isSignInDisabled.value = true;
      // 发送登录请求
      // 假设我们有一个名为 login 的函数，它接受电子邮件地址和密码作为参数，并返回一个 Promise
      await login(username.value, password.value);
      // 登录成功


      router.push('/home');
      // 在这里处理登录成功后的逻辑，例如跳转到主页
    } catch (err) {
      // 登录失败
      error.value = true;
      errorMessage.value = ('用户名或密码错误');
    }
  } else {
    // 提示用户先滑动解锁
    alert('请先滑动解锁');
    
    refreshPage();
  }
};

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    // 模拟异步登录请求
    setTimeout(() => {
      if (username === "admin" && password === "123456") {
        // 登录成功
        resolve();
      } else {
        // 登录失败
        reject(new Error("用户名或密码错误"));
        
      }
    }, 1000);
  });
};


</script>

<style scoped>
</style>
