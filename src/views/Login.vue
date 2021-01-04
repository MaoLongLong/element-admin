<template>
  <div id="login-container">
    <el-card id="login-form" shadow="always">
      <el-form :model="loginForm">
        <div id="title-container">
          <h3>Log in</h3>
        </div>
        <el-form-item>
          <el-input
            placeholder="用户名 (admin)"
            prefix-icon="el-icon-user"
            v-model="loginForm.username"/>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="密码 (123)"
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"/>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            @click="handleSubmit"
            style="width: 100%"
            type="primary">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.$store.dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.$route.query.redirect || '/' });
          this.$message.success('登录成功');
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  #login-container {
    height: 100vh;
    background-color: #909399;
    display: flex;
    justify-content: center;

    #login-form {
      margin-top: 140px;
      height: 350px;
      width: 500px;

      #title-container {

        h3 {
          font-size: 30px;
          user-select: none;
          font-family: "Indie Flower", sans-serif;
          color: #303133;
          text-align: center;
        }
      }
    }
  }
</style>
