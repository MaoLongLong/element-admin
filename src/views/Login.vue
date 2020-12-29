<template>
  <div id="login-container">
    <el-card shadow="always" id="login-form">
      <el-form :model="loginForm">
        <div id="title-container">
          <h3>Classroom</h3>
        </div>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
            placeholder="用户名 (admin)"/>
        </el-form-item>
        <el-form-item>
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            placeholder="密码 (123)"/>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            style="width: 100%"
            @click="handleSubmit"
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
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.$route.query.redirect || '/' });
        this.$message.success('登录成功');
        this.loading = false;
      }).catch((err) => {
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
