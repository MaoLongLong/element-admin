<template>
  <el-container id="basic-layout">
    <el-header id="header">
      <div id="logo">Classroom</div>
      <el-avatar :src="avatar" />
    </el-header>
    <el-container id="sub">
      <el-aside id="aside" width="200px">
        <Menu/>
      </el-aside>
      <el-scrollbar id="scrollbar">
        <el-main>
          <router-view/>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import Menu from '../components/Menu.vue';
import avatar from '../assets/avatar.png';

export default {
  name: 'BasicLayout',
  components: {
    Menu,
  },
  data() {
    return {
      avatar,
    };
  },
};
</script>

<style lang="scss" scoped>
  #basic-layout {
    height: 100%;

    #header {
      border-bottom: #DCDFE6 solid 1px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      #logo {
        font-family: "Indie Flower", sans-serif;
        font-weight: bold;
        font-size: 30px;
        user-select: none;
        display: inline-block;
      }
    }

    #sub {
      height: calc(100% - 60px);

      #aside {
        overflow: hidden;

        .el-menu {
          border-right: none;
        }
      }

      #scrollbar {
        height: 100%;
        width: 100%;

        /deep/ .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
    }
  }
</style>
