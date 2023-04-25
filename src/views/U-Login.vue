<template>
  <v-container>
    <v-card color="white"
            class="pa-3"
            elevation="3">
      <v-card-title class="my-4 text-h4">
        <span class="flex-1"> Welcome </span>
      </v-card-title>
      <v-card-subtitle>Sign in to your account</v-card-subtitle>
      <!-- sign in form -->

      <v-card-text>
        <v-form ref="refLoginForm"
                class="text-left"
                v-model="isFormValid"
                lazy-validation>
          <v-text-field ref="refUsername"
                        v-model="username"
                        required
                        clearable
                        :error="error"
                        label="用户名"
                        density="default"
                        color="primary"
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
                        :error-messages="errorMessages"
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

          <v-btn :loading="isLoading"
                 :disabled="isSignInDisabled"
                 block
                 size="x-large"
                 color="primary"
                 @click="handleLogin"
                 class="mt-2">登录</v-btn>
        </v-form>

      </v-card-text>
    </v-card>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const username = ref("admin");
const password = ref("123456");
const error = ref(false);
const errorMessage = ref("");
const refLoginForm = ref();
const isFormValid = ref(true);
// show password field
const showPassword = ref(false);
// 验证
const usernameRules = [
  (v) => !!v || "用户名不能为空",
  (v) => v.length >= 3 || "用户名至少为三个字符",
];

const passwordRules = ref([
  (v) => !!v || "密码不能为空",
  (v) =>
    (v && v.length <= 10) || "密码少于10个字符",
]);


const handleLogin = async () => {
  // 验证电子邮件地址和密码
  if (!username.value || !password.value) {
    error.value = true;
    errorMessage.value = "Email and password are required";
    return;
  }

  try {
    // 发送登录请求
    // 假设我们有一个名为 login 的函数，它接受电子邮件地址和密码作为参数，并返回一个 Promise
    await login(username.value, password.value);
    // 登录成功
    // 在这里处理登录成功后的逻辑，例如跳转到主页
  } catch (err) {
    // 登录失败
    error.value = true;
    errorMessage.value = err.message;
  }
};

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // 模拟异步登录请求
    setTimeout(() => {
      if (email === "admin" && password === "123456") {
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
.card {
  max-width: 400px;
  margin: 0 auto;
}
</style>
