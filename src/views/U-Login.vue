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
             <!-- <slide-verify :l="42" :r="10" :w="310" :h="155" slider-text="向右滑动" @success="onSuccess" @fail="onFail"></slide-verify> -->
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
const router = useRouter()

const username = ref("admin");
const password = ref("123456");
const error = ref(false);
const isSignInDisabled = ref(false);
const errorMessage = ref();
const refLoginForm = ref();

// show password field
const showPassword = ref(false);


const resetErrors = () => {
  error.value = false;
  errorMessage.value = "";
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
  location.reload(0);
}
// 添加一个新的状态变量来跟踪滑动验证是否成功
const isSlideVerifySuccess = ref(true);

// // 在滑动验证成功时更新状态变量
// const onSuccess = () => {
//   isSlideVerifySuccess.value = true;
// };

// // 在滑动验证失败时重置状态变量
// const onFail = () => {
//   isSlideVerifySuccess.value = false;
//   this.$refs.slideVerify.refresh();
// };

const handleLogin = async () => {
  if (isSlideVerifySuccess.value) {
    try {
      isSignInDisabled.value = true;
      // 发送登录请求
      await login(username.value, password.value);
      localStorage.setItem('isLoggedIn', 'true');
      // 登录成功
      router.push('/home');
    } catch (err) {
      // 登录失败
      error.value = true;
      errorMessage.value = '用户名或密码错误';
    } finally {
      isSignInDisabled.value = false;
    }
  } else {
    // 提示用户先滑动解锁和完成滑动验证
    alert('请先滑动解锁并完成滑动验证');
    refreshPage();
  }
};

const login = (username, password) => {
  return new Promise((resolve, reject) => {

    // 模拟异步登录请求
    setTimeout(() => {
      if (username === 'admin' && password === '123456') {
        // 登录成功
        resolve();
      } else {
        // 登录失败
        reject(new Error('用户名或密码错误'));
      }
    }, 1000);
  });
};


</script>

<style scoped>
</style>
